// pages/api/reset-password.ts

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";
import ReactDOMServer from "react-dom/server";
import React from "react";
import jwt from "jsonwebtoken";
import PasswordResetMail from "../../../emails/PasswordResetMail";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;

  if (!process.env.APP_SECRET) {
    res.status(500).json({
      error: "JWT secret is not defined in the environment variables",
    });
    return;
  }

  if (req.method === "POST") {
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
        { expiresIn: '1h' }
      );
    
      // Mettez à jour l'utilisateur avec le nouveau token de réinitialisation du mot de passe
      const user = await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          passwordResetToken: token,
          // Définissez également la date d'expiration du token, par exemple 1 heure à partir de maintenant
          passwordResetTokenExpires: new Date(Date.now() + 3600000),
        },
      });
    
      console.log("Password reset token saved successfully:", user);
    
      const resetLink = `${process.env.BASE_URL}/reset-password?token=${token}`;
    
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
    } catch (error: any) {
      console.error("Error occurred:", error);
      res.status(500).json({ error: "Something went wrong", message: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
