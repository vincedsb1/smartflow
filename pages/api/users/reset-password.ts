import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";
import ReactDOMServer from "react-dom/server";
import React from "react";
import jwt from "jsonwebtoken";
import PasswordResetMail from "../../../emails/PasswordResetMail";
import argon2 from "argon2";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!process.env.APP_SECRET) {
    res.status(500).json({
      error: "JWT secret is not defined in the environment variables",
    });
    return;
  }

  if (req.method === "POST") {
    const { email, password, token } = req.body;
    if (token && password) {
      try {
        const decoded = jwt.verify(token, process.env.APP_SECRET);
        const userEmail = decoded.email;

        const user = await prisma.user.findUnique({
          where: {
            email: userEmail,
          },
        });

        if (
          !user ||
          user.passwordResetToken !== token ||
          (user.passwordResetTokenExpires &&
            new Date() > user.passwordResetTokenExpires)
        ) {
          return res.status(400).json({ error: "Invalid or expired token" });
        }

        const hashedPassword = await argon2.hash(password);

        await prisma.user.update({
          where: {
            email: userEmail,
          },
          data: {
            password: hashedPassword,
            passwordResetToken: null,
            passwordResetTokenExpires: null,
          },
        });

        return res.status(200).json({ message: "Password reset successfully" });
      } catch (error) {
        console.error("Error occurred:", error);
        return res
          .status(500)
          .json({
            error: "Something went wrong",
            message: (error as Error).message,
          });
      }
    } else if (email) {
      const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

      if (!emailRegex.test(email)) {
        res.status(400).json({ error: "Invalid email format" });
        return;
      }

      try {
        console.log("Saving email:", email);

        const token = jwt.sign(
          { email, iat: Math.floor(Date.now() / 1000) },
          process.env.APP_SECRET,
          { expiresIn: "1h" }
        );

        await prisma.user.update({
          where: {
            email: email,
          },
          data: {
            passwordResetToken: token,
            passwordResetTokenExpires: new Date(Date.now() + 3600000),
          },
        });

        console.log("Password reset token saved successfully");

        const resetLink = `${
          process.env.BASE_URL
        }/resetPassword?token=${token}&email=${encodeURIComponent(email)}`;

        const emailContent = ReactDOMServer.renderToString(
          React.createElement(PasswordResetMail, {
            email,
            link: resetLink,
          })
        );

        await resend.emails.send({
          from: "do-not-reply@smartflow-app.com",
          to: email,
          subject: "Réinitialisation du mot de passe",
          html: emailContent,
        });

        res.status(200).json({ message: "Email sent successfully" });
      } catch (error) {
        console.error("Error occurred:", error);
        res
          .status(500)
          .json({
            error: "Something went wrong",
            message: (error as Error).message,
          });
      }
    } else {
      res.status(400).json({ error: "Email or token and password required" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
