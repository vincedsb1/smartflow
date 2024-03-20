import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

interface CustomNextApiRequest extends NextApiRequest {
  user: User;
}

export default async function handle(
  req: CustomNextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Get user from request
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const cards = await prisma.card.findMany({
      where: {
        userId: user.id,
      },
    });

    return res.json(cards);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching cards" });
  }
}
