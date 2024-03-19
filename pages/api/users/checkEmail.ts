import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import * as ReactDOMServer from "react-dom/server";
import VerificationMail from "../../../emails/verificationMail";
import React from "react";

const prisma = new PrismaClient();

export const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const email =
      typeof req.query.email === "string" ? req.query.email : undefined;

    try {
      // Vérifiez si l'e-mail existe déjà
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        // Si l'utilisateur n'existe pas, envoyez un e-mail
        if (email) {
          const token = uuidv4();

          // Stockez le token et l'e-mail de l'utilisateur dans votre base de données
          await prisma.emailVerification.create({
            data: {
              email: email,
              token: token,
              expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 heures à partir de maintenant
            },
          });

          const verificationLink = `http://localhost:3000/inscriptionfirstname?token=${token}`;

          const emailContent = ReactDOMServer.renderToString(
            React.createElement(VerificationMail, {
              email: email,
              link: verificationLink,
            })
          );

          await resend.emails.send({
            from: "onboarding@resend.dev",
            to: "thibaut.mosteau@lilo.org",
            subject: "Hello World",
            html: emailContent,
          });

          res.status(200).json({ message: "Email sent" });
        } else {
          res.status(400).json({ message: "Email is undefined" });
        }
      } else {
        // Si l'utilisateur existe déjà, renvoyez une réponse avec un statut 200
        res.status(200).json({ message: "Email already exists" });
      }
    } catch (err) {
      console.log(`Error: ${err}`);
      res
        .status(500)
        .json({ message: "An error occurred while checking the email" });
    }
  }
}
