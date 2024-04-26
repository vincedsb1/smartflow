import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import verifyToken from "../../api/auth/authMiddleware";
import moment from "moment";

const prisma = new PrismaClient();

interface CustomNextApiRequest extends NextApiRequest {
  user: { userId: number; iat: number; exp: number };
}

export default function handle(
  req: CustomNextApiRequest,
  res: NextApiResponse
) {
  verifyToken(req, res, async () => {
    console.log("req.user:", req.user);

    if (req.method !== "GET") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    const { userId } = req.user;

    console.log("user:", req.user);

    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      console.log("Fetching cards for user ID:", userId);
      const today = moment().startOf("day");
      const cards = await prisma.card.findMany({
        where: {
          userId: userId,
          lastReviewDate: {
            lt: today.toDate(),
          },
        },
        include: {
          category: {
            select: {
              color: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      // Map over the cards and reformat each card
      const reformattedCards = cards.map((card) => {
        return {
          ...card,
          categoryColorName: card.category?.color.name,
          category: undefined,
        };
      });
      console.log("Cards fetched:", cards);

      return res.json(reformattedCards);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "An error occurred while fetching the cards." });
    }
  });
}
