import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const cards = await prisma.card.findMany();
      res.json(cards);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  } else if (req.method === "POST") {
    const card = req.body;
    try {
      const createdCard = await prisma.card.create({ data: card });
      res.status(201).json(createdCard);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  } else if (req.method === "PUT") {
    const card = req.body;
    try {
      const updatedCard = await prisma.card.update({
        where: { id: card.id },
        data: card,
      });
      res.json(updatedCard);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    try {
      const deletedCard = await prisma.card.delete({
        where: { id },
      });
      res.json(deletedCard);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  } else {
    res.status(405).end();
  }
}