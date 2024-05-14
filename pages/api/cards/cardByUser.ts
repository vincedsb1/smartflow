import { PrismaClient, Card } from "@prisma/client";
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
    const toReview = req.query.toReview === "true";

    console.log("user:", req.user);

    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      console.log("Fetching cards for user ID:", userId);
      const today = moment().startOf("day");

      const cards = await prisma.card.findMany({
        where: { userId },
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

      const reformattedCards = cards
        .filter((card) => {
          if (toReview) {
            const createdAt = moment(card.createdAt);
            const lastReviewDate = moment(card.lastReviewDate);
            const sameDate = createdAt.isSame(lastReviewDate, "minute");

            if (sameDate && card.level === 1) {
              return true;
            }

            switch (card.level) {
              case 1:
                return lastReviewDate.isBefore(today);
              case 2:
                return lastReviewDate.isBefore(
                  moment().subtract(1, "days").startOf("day")
                );
              case 3:
                return lastReviewDate.isBefore(
                  moment().subtract(3, "days").startOf("day")
                );
              case 4:
                return lastReviewDate.isBefore(
                  moment().subtract(7, "days").startOf("day")
                );
              case 5:
                return lastReviewDate.isBefore(
                  moment().subtract(15, "days").startOf("day")
                );
              default:
                return false;
            }
          }

          return true;
        })
        .map(
          (card: Card & { category: { color: { name: string } } | null }) => {
            return {
              ...card,
              categoryColorName: card.category?.color.name,
              category: undefined,
            };
          }
        );

      return res.json(reformattedCards);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "An error occurred while fetching the cards." });
    }
  });
}
