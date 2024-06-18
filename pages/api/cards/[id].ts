import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import moment from "moment-timezone";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authorizationHeader.split(" ")[1];
  let userId;
  try {
    const decoded = jwt.verify(token, process.env.APP_SECRET as string);
    userId = (decoded as any).userId;
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }

  if (req.method === "GET") {
    try {
      const card = await prisma.card.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          category: {
            include: {
              color: true,
            },
          },
        },
      });

      console.log("Card:", card);
      console.log("User ID:", userId);

      if (!card || card.userId !== Number(userId)) {
        return res.status(404).json({ error: "Card not found" });
      }

      // Add category name and color to the response
      const response = {
        ...card,
        categoryName: card.category?.name,
        categoryColor: card.category?.color?.name,
      };

      return res.status(200).json(response);
    } catch (error) {
      console.log("Database error:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while retrieving the card" });
    }
  } else if (req.method === "PATCH") {
    const { isReviewPositive } = req.body;

    if (typeof isReviewPositive !== "boolean") {
      return res.status(400).json({ error: "Invalid review value" });
    }

    try {
      const card = await prisma.card.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!card || card.userId !== Number(userId)) {
        return res.status(404).json({ error: "Card not found" });
      }

      let newLevel = card.level;
      let newActive = card.active;

      if (isReviewPositive) {
        newLevel = card.level === 7 ? 7 : card.level + 1;
        newActive = card.level === 7 ? false : card.active;
      } else {
        newLevel = 1;
      }

      const now = new Date();
      console.log("Review date: ", moment(now).tz("Europe/Paris").format());

      const updatedCard = await prisma.card.update({
        where: {
          id: Number(id),
        },
        data: {
          level: newLevel,
          active: newActive,
          lastReviewDate: now,
        },
      });

      return res.json(updatedCard);
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
