import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  } else if (req.method === "POST") {
    const user = req.body;
    try {
      const createdUser = await prisma.user.create({ data: user });
      res.status(201).json({ insertId: createdUser.id });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
