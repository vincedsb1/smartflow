import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const notifications = await prisma.notification.findMany();
      res.json(notifications);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  } else if (req.method === "POST") {
    const notification = req.body;
    try {
      const createdNotification = await prisma.notification.create({
        data: notification,
      });
      res.status(201).json(createdNotification);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  } else if (req.method === "PUT") {
    const notification = req.body;
    try {
      const updatedNotification = await prisma.notification.update({
        where: { id: notification.id },
        data: notification,
      });
      res.json(updatedNotification);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    try {
      const deletedNotification = await prisma.notification.delete({
        where: { id },
      });
      res.json(deletedNotification);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  } else {
    res.status(405).end();
  }
}
