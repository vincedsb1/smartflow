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
    const toReview = req.query.toReview === "true";

    console.log("user:", req.user);

    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      console.log("Fetching cards for user ID:", userId);
      const today = moment().startOf("day");
      let whereCondition: { userId: number; OR?: any[] } = { userId: userId };

      if (toReview) {
        const twoDaysAgo = moment().subtract(1, "days").startOf("day"); // level 2 : tous les 2 jours
        const sixDaysAgo = moment().subtract(3, "days").startOf("day"); // level 3 : tous les 4 jours
        const twelveDaysAgo = moment().subtract(7, "days").startOf("day"); // level 4 : tous les 8 jours
        const twentyTwoDaysAgo = moment().subtract(15, "days").startOf("day"); // level 5 : tous les 16 jours

        whereCondition.OR = [
          { AND: [{ level: 1 }, { lastReviewDate: { lt: today.toDate() } }] },
          {
            AND: [
              { level: 2 },
              { lastReviewDate: { lt: twoDaysAgo.toDate() } },
            ],
          },
          {
            AND: [
              { level: 3 },
              { lastReviewDate: { lt: sixDaysAgo.toDate() } },
            ],
          },
          {
            AND: [
              { level: 4 },
              { lastReviewDate: { lt: twelveDaysAgo.toDate() } },
            ],
          },
          {
            AND: [
              { level: 5 },
              { lastReviewDate: { lt: twentyTwoDaysAgo.toDate() } },
            ],
          },
        ];
      }

      const cards = await prisma.card.findMany({
        where: whereCondition,
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

      return res.json(reformattedCards);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "An error occurred while fetching the cards." });
    }
  });
}
