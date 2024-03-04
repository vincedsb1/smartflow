import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = Number(req.query.id);

  if (req.method === "GET") {
    try {
      const categories = await prisma.category.findMany({
        where: { cards: { some: { userId: userId } } },
        include: { cards: true },
      });
      res.json(categories);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      }
    }
  } else if (req.method === "POST") {
    try {
      const newCategory = await prisma.category.create({
        data: { ...req.body, userId: userId },
      });
      res.status(201).json(newCategory);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      }
    }
  } else if (req.method === "PUT") {
    try {
      const updatedCategory = await prisma.category.update({
        where: { id: Number(req.body.id) },
        data: req.body,
      });
      res.json(updatedCategory);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      }
    }
  } else if (req.method === "DELETE") {
    try {
      const deletedCategory = await prisma.category.delete({
        where: { id: Number(req.body.id) },
      });
      res.json(deletedCategory);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      }
    }
  } else {
    res.status(405).end();
  }
}