import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const languages = await prisma.language.findMany();
      res.json(languages);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    } finally {
      await prisma.$disconnect();
    }
  } else if (req.method === "POST") {
    const language = req.body;
    try {
      const createdLanguage = await prisma.language.create({ data: language });
      res.status(201).json(createdLanguage);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    } finally {
      await prisma.$disconnect();
    }
  } else if (req.method === "PUT") {
    const language = req.body;
    try {
      const updatedLanguage = await prisma.language.update({
        where: { id: language.id },
        data: language,
      });
      res.json(updatedLanguage);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    } finally {
      await prisma.$disconnect();
    }
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    try {
      const deletedLanguage = await prisma.language.delete({
        where: { id },
      });
      res.json(deletedLanguage);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).end();
  }
}
