// Dans le fichier api/verify-email-change.ts
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { token } = req.body;

    const emailVerification = await prisma.emailVerification.findUnique({
      where: { token },
      include: { User: true }
    });

    if (!emailVerification || new Date() > emailVerification.expiresAt) {
      res.status(400).json({ message: "Invalid or expired token" });
      return;
    }

    if (!emailVerification.User) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    await prisma.user.update({
      where: { id: emailVerification.User.id },
      data: { email: emailVerification.email }
    });

    await prisma.emailVerification.delete({ where: { token } });

    res.status(200).json({ message: "Email changed successfully" });
  }
}