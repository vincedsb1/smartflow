import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = Number(req.query.userId);

  if (req.method === "GET") {
    const categories = await prisma.category.findMany({
      where: { cards: { some: { userId: userId } } },
      include: { color: true },
    });
    res.json(categories);
  } else if (req.method === "PUT") {
    const categoryId = Number(req.body.categoryId);
    try {
      const updatedCategory = await prisma.category.update({
        where: { id: categoryId },
        data: { colorId: req.body.colorId },
      });
      res.json(updatedCategory);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      }
    }
  }
}