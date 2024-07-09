import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";
import ReactDOMServer from "react-dom/server";
import React from "react";
import jwt from "jsonwebtoken";
import WaitingMailVerification from "../../../emails/WaitingMailVerification";

const prisma = new PrismaClient();

export const resend = new Resend(process.env.RESEND_API_KEY);

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
      const existingProspect = await prisma.waitingListEmail.findUnique({
        where: {
          email,
        },
      });

      if (existingProspect) {
        res.status(409).json({ error: "Email already exists in the waiting list" });
        return;
      }

      console.log("Saving email:", email);

      const token = jwt.sign(
        { email, iat: Math.floor(Date.now() / 1000) },
        process.env.APP_SECRET
      );

      const newProspect = await prisma.waitingListEmail.create({
        data: {
          email,
          token,
        },
      });

      console.log("Email saved successfully:", newProspect);

      const verificationLink = `${process.env.BASE_URL}/verify-email-prospect?token=${token}`;

      const emailContent = ReactDOMServer.renderToString(
        React.createElement(WaitingMailVerification, {
          email,
          link: verificationLink,
        })
      );

      await resend.emails.send({
        from: "do-not-reply@smartflow-app.com",
        to: email,
        subject: "Vérification du mail",
        html: emailContent,
      });

      console.log("Verification email sent successfully");

      res.status(201).json(newProspect);
    } catch (error) {
      console.error("Error occurred:", error);
      res.status(500).json({ error: "Something went wrong", message: (error as Error).message });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

