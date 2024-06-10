import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import React from "react";
import ReactDOMServer from "react-dom/server";
import EmailChangeMail from "@/emails/EmailChangeMail";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export const resend = new Resend(process.env.RESEND_API_KEY);
console.log(process.env.RESEND_API_KEY);

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { currentEmail, newEmail } = req.body;

  if (req.method === "POST") {
    if (!currentEmail || !newEmail) {
      return res
        .status(400)
        .json({ error: "Current email or new email is not defined" });
    }

    // Simple validation for email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(newEmail)) {
      return res.status(400).json({ error: "Veuillez entrer un email valide" });
    }

    try {
      const user = await prisma.user.findUnique({
        where: {
          email: currentEmail,
        },
      });

      if (!user) {
        return res.status(400).json({ error: "Current email not found" });
      }

      const newEmailExists = await prisma.user.findUnique({
        where: {
          email: newEmail,
        },
      });

      if (newEmailExists) {
        return res.status(400).json({ error: "New email already exists" });
      }

      const token = uuidv4();

      const existingVerification = await prisma.emailVerification.findUnique({
        where: { userId: user.id },
      });

      if (existingVerification) {
        await prisma.emailVerification.update({
          where: { userId: user.id },
          data: { email: newEmail, token: token },
        });
      } else {
        await prisma.emailVerification.create({
          data: {
            email: newEmail,
            token: token,
            userId: user.id,
          },
        });
      }

      const emailContent = ReactDOMServer.renderToString(
        React.createElement(EmailChangeMail, {
          email: newEmail,
          link: `${process.env.BASE_URL}/verify-email?token=${token}&email=${newEmail}`,
        })
      );

      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "vincedsb@gmail.com",
        subject: "Vérification du mail",
        html: emailContent,
      });

      return res.status(200).json({ message: "Verification email sent" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: "An error occurred while changing the email" });
    }
  } else {
    res.status(405).json({ error: "We only support POST" });
  }
}
