import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { title, category, content } = req.body;

  // Get the token from the Authorization header
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  let decodedToken: { userId: number } | null = null;

  try {
    // Replace 'your-secret' with your actual secret
    decodedToken = jwt.verify(token, process.env.APP_SECRET) as {
      userId: number;
    };
  } catch (err) {
    return res.status(500).json({ error: (err as Error).message });
  }

  if (!decodedToken) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const card = await prisma.card.create({
      data: {
        title: title,
        categoryId: category,
        answer: content,
        level: 1, // You can change this value according to your needs
        lastReviewDate: new Date("1970-01-01T00:00:00Z"), // Définir à 01/01/1970
        userId: decodedToken.userId,
      },
    });
    res.status(201).json(card);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  } finally {
    await prisma.$disconnect();
  }
}
