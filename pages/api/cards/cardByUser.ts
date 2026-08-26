import { PrismaClient, Card } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import verifyToken from "@/lib/authMiddleware";
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

      // Code 1 : Aucune carte trouvée pour cet utilisateur
      // Cela signifie que l'utilisateur n'a pas encore créé de cartes.

      // Code 2 : Aucune carte à réviser aujourd'hui
      // Cela signifie que l'utilisateur a des cartes, mais aucune d'entre elles n'est due pour une révision aujourd'hui.

      // Code 3 : Toutes les cartes à réviser ont été révisées aujourd'hui
      // Cela signifie que l'utilisateur avait des cartes à réviser aujourd'hui, mais toutes ont déjà été révisées.

      // Code 4 : Liste des cartes à réviser
      // Cela signifie qu'il y a des cartes que l'utilisateur doit réviser aujourd'hui. Les détails de ces cartes sont inclus dans la réponse.

      if (cards.length === 0) {
        return res
          .status(200)
          .json({ code: 1, message: "No cards found for this user." });
      }

      const cardsToReview = cards.filter((card) => {
        const lastReviewDate = moment(card.lastReviewDate).startOf("day");
        console.log(`Card ID: ${card.id}, Last Review Date: ${lastReviewDate}`);
        return lastReviewDate.isSameOrBefore(today);
      });

      console.log(`Cards to review: ${cardsToReview.length}`);

      if (cardsToReview.length === 0) {
        return res
          .status(200)
          .json({ code: 2, message: "No cards to review today." });
      }

      const allReviewed = cardsToReview.every((card) => {
        const lastReviewDate = moment(card.lastReviewDate);
        console.log(`Card ID: ${card.id}, Last Review Date: ${lastReviewDate}`);
        return lastReviewDate.isSame(today, "day");
      });

      console.log(`All reviewed: ${allReviewed}`);

      if (allReviewed) {
        return res.status(200).json({
          code: 3,
          message: "All cards to review have been reviewed today.",
        });
      }

      const reformattedCards = cardsToReview
        .filter((card) => {
          const createdAt = moment(card.createdAt);
          const lastReviewDate = moment(card.lastReviewDate);
          const sameDate = createdAt.isSame(lastReviewDate, "minute");

          if (sameDate && card.level === 1) {
            return true;
          }

          switch (card.level) {
            case 1:
              return lastReviewDate.startOf("day").isBefore(today);
            case 2:
              return lastReviewDate
                .startOf("day")
                .isBefore(moment().subtract(1, "days").startOf("day"));
            case 3:
              return lastReviewDate
                .startOf("day")
                .isBefore(moment().subtract(3, "days").startOf("day"));
            case 4:
              return lastReviewDate
                .startOf("day")
                .isBefore(moment().subtract(7, "days").startOf("day"));
            case 5:
              return lastReviewDate
                .startOf("day")
                .isBefore(moment().subtract(15, "days").startOf("day"));
            default:
              return false;
          }
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

      if (reformattedCards.length === 0) {
        return res.status(200).json({
          code: 2,
          message: "No cards to review today.",
        });
      }

      return res.json({ code: 4, cards: reformattedCards });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "An error occurred while fetching the cards." });
    }
  });
}
