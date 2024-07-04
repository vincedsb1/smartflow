import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const rules = await prisma.rule.findMany();
      res.json(rules);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    } finally {
      await prisma.$disconnect();
    }
  } else if (req.method === "POST") {
    const rule = req.body;
    try {
      const createdRule = await prisma.rule.create({ data: rule });
      res.status(201).json(createdRule);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    } finally {
      await prisma.$disconnect();
    }
  } else if (req.method === "PUT") {
    const rule = req.body;
    try {
      const updatedRule = await prisma.rule.update({
        where: { id: rule.id },
        data: rule,
      });
      res.json(updatedRule);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    } finally {
      await prisma.$disconnect();
    }
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    try {
      const deletedRule = await prisma.rule.delete({
        where: { id },
      });
      res.json(deletedRule);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).end();
  }
}
