import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

    try {
      const user = await prisma.user.delete({
        where: { id: Number(userId) },
      });
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ message: "Error deleting user", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}