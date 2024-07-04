import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token, email } = req.query;

  if (req.method === "GET") {
    if (!token || !email) {
      return res.status(400).json({ error: "Token or email is not defined" });
    }

    try {
      const emailVerification = await prisma.emailVerification.findUnique({
        where: {
          token: token as string,
        },
      });

      if (!emailVerification || emailVerification.email !== email) {
        return res.status(400).json({ error: "Invalid token or email" });
      }

      const existingUser = await prisma.user.findUnique({
        where: { email: emailVerification.email },
      });

      if (existingUser) {
        return res.status(400).json({ error: "Email is already in use" });
      }

      if (!emailVerification.userId) {
        return res.status(400).json({ error: "User ID is not defined" });
      }

      const userToUpdate = await prisma.user.findUnique({
        where: { id: emailVerification.userId },
      });

      if (!userToUpdate) {
        return res.status(400).json({ error: "User not found" });
      }

      const updatedUser = await prisma.user.update({
        where: { id: emailVerification.userId },
        data: { email: emailVerification.email },
      });

      const deletedEmailVerification = await prisma.emailVerification.delete({
        where: { token: token as string },
      });

      return res.status(200).json({ message: "Email updated successfully" });
    } catch (error) {
      console.error("Error:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while verifying the email" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: "We only support GET" });
  }
}
