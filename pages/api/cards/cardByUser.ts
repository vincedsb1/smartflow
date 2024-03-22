import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import verifyToken from '../../api/auth/authMiddleware';

const prisma = new PrismaClient();

interface CustomNextApiRequest extends NextApiRequest {
  user: User;
}

export default function handle(req: CustomNextApiRequest, res: NextApiResponse) {
  verifyToken(req, res, async () => {
    console.log('req.user:', req.user);

    if (req.method !== "GET") {
      return res.status(405).json({ message: "Method not allowed" });
    }
    const user = req.user;
    console.log('user:', req.user);

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
  return res.status(500).json({ message: 'An error occurred while fetching the cards.' });
}
  });
}