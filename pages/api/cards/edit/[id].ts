import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const { title, answer, categoryId } = req.body;

  if (req.method === "PUT") {
    try {
      const card = await prisma.card.update({
        where: { id: Number(id) },
        data: { title, answer, categoryId: Number(categoryId) },
      });

      res.json(card);
    } catch (error) {
      res.status(500).json({
        error: "Une erreur est survenue lors de la mise à jour de la carte",
      });
    }
  } else {
    res.status(405).json({ error: "Cette méthode n'est pas autorisée" });
  }
}
