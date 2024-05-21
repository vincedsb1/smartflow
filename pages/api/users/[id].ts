import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";
import ReactDOMServer from "react-dom/server";
import React from "react";
import DeleteMail from "@/emails/DeleteMail";

const prisma = new PrismaClient();

export const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.query.id;

  if (req.method === 'DELETE') {
    if (isNaN(Number(userId))) {
      res.status(400).json({ message: "User ID must be a number" });
      return;
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!existingUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    await prisma.category.deleteMany({
      where: { userId: Number(userId) },
    });


    const emailContent = ReactDOMServer.renderToString(
      React.createElement(DeleteMail, {
        email: existingUser.email,
      })
    );

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "thibaut.mosteau@lilo.org", // remplacer mail thibaut par existingUser.email
      subject: "Vérification du mail",
      html: emailContent,
    });

    try {
      const user = await prisma.user.delete({
        where: { id: Number(userId) },
      });
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ message: "Error deleting user", error: error.message });
    }
  }
}