import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const colors = await prisma.color.findMany();
      res.json(colors);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  } else if (req.method === "POST") {
    const color = req.body;
    try {
      const createdColor = await prisma.color.create({ data: color });
      res.status(201).json(createdColor);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  } else if (req.method === "PUT") {
    const color = req.body;
    try {
      const updatedColor = await prisma.color.update({
        where: { id: color.id },
        data: color,
      });
      res.json(updatedColor);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    try {
      const deletedColor = await prisma.color.delete({
        where: { id },
      });
      res.json(deletedColor);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  } else {
    res.status(405).end();
  }
}
