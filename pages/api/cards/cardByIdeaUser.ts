import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { userId } = req.body;

  if (req.method === 'GET') {
    try {
      const card = await prisma.card.findUnique({
        where: {
          id: Number(id),
          userId: Number(userId),
        },
      });

      if (!card) {
        return res.status(404).json({ error: 'Card not found' });
      }

      return res.status(200).json(card);
    } catch (error) {
      return res.status(500).json({ error: 'An error occurred while retrieving the card' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}