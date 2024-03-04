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
      const user = await prisma.card.findUnique({ where: { id: userId } });
      if (user === null) {
        res.status(404).end();
      } else {
        res.json(user);
      }
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      }
    }
  } else if (req.method === "PUT") {
    try {
      const updatedUser = await prisma.card.update({
        where: { id: userId },
        data: req.body,
      });
      res.json(updatedUser);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      }
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.$transaction(
        async (prisma: {
          card: { deleteMany: (arg0: { where: { userId: number } }) => any };
          notification: {
            deleteMany: (arg0: { where: { userId: number } }) => any;
          };
          user: { delete: (arg0: { where: { id: number } }) => any };
        }) => {
          await prisma.card.deleteMany({ where: { userId: userId } });
          await prisma.notification.deleteMany({ where: { userId: userId } });
          await prisma.user.delete({ where: { id: userId } });
        }
      );
      res.status(204).end();
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      }
    }
  } else {
    res.status(405).end();
  }
}
