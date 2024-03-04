import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function getUserId(req: NextApiRequest): number {
  return 1;
}
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const notificationId = Number(req.query.id);
  const userId: number = getUserId(req);

  if (req.method === "GET") {
    try {
      const notification = await prisma.notification.findUnique({
        where: {
          id: notificationId,
          userId: userId, 
        },
        include: {
          user: true,
        },
      });
      if (notification === null) {
        res.status(404).end();
      } else {
        res.json(notification);
      }
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      }
    }
  } else {
    res.status(405).end();
  }
}
