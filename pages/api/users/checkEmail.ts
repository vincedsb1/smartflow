import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import * as ReactDOMServer from "react-dom/server";
import dynamic from "next/dynamic";
import React from "react";

import VerificationMail from "../../../emails/verificationMail";

// vérification de l'email par rapport au token

const prisma = new PrismaClient();

export const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const email =
      typeof req.query.email === "string" ? req.query.email : undefined;

    // Vérifie si l'email est dans un format valide
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!email || !emailRegex.test(email)) {
      res.status(400).json({ message: "Email is invalid" });
      return;
    }

    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        const token = uuidv4();

        await prisma.emailVerification.create({
          data: {
            email: email,
            token: token,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 heures à partir de maintenant
          },
        });

        const verificationLink = `${process.env.BASE_URL}/register-firstname?token=${token}`;

        const emailContent = ReactDOMServer.renderToString(
          React.createElement(VerificationMail, {
            email: email,
            link: verificationLink,
          })
        );

        await resend.emails.send({
          from: "do-not-reply@smartflow-app.com",
          to: email,
          subject: "Vérifiez votre email",
          html: emailContent,
        });

        res.status(200).json({ message: "Email sent" });
      } else {
        res.status(200).json({ message: "Email already exists" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "An error occurred while checking the email" });
    } finally {
      await prisma.$disconnect();
    }
  }
}
