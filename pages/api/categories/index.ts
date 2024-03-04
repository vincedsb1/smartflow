import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const categories = await prisma.category.findMany();
      res.json(categories);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  } else if (req.method === "POST") {
    const category = req.body;
    try {
      const createdCategory = await prisma.category.create({ data: category });
      res.status(201).json(createdCategory);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  } else if (req.method === "PUT") {
    const category = req.body;
    try {
      const updatedCategory = await prisma.category.update({
        where: { id: category.id },
        data: category,
      });
      res.json(updatedCategory);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    try {
      const deletedCategory = await prisma.category.delete({
        where: { id },
      });
      res.json(deletedCategory);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  } else {
    res.status(405).end();
  }
}
