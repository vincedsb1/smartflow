import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import verifyToken from "../../api/auth/authMiddleware";

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

    const { userId } = req.user;
    console.log("user:", req.user);

    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (req.method === "GET") {
      try {
        console.log("Fetching categories for user ID:", userId);
        const categories = await prisma.category.findMany({
          where: {
            userId: userId,
          },
          include: {
            color: true,
          },
        });
        const categoriesWithColorName = categories.map((category) => ({
          ...category,
          colorName: category.color.name,
        }));

        return res.json(categoriesWithColorName);
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          message: "An error occurred while fetching the categories.",
        });
      }
    } else if (req.method === "PUT") {
      let { categoryId, name, colorId } = req.body;

      if (!categoryId || !name || !colorId) {
        return res.status(400).json({ message: "Missing parameters" });
      }

      // Convert colorId to a number if it's a string
      if (typeof colorId === "string") {
        colorId = parseInt(colorId);
        if (isNaN(colorId)) {
          return res.status(400).json({ message: "Invalid colorId" });
        }
      }

      try {
        const updatedCategory = await prisma.category.update({
          where: { id: categoryId },
          data: { name: name, colorId: colorId },
        });

        return res.json(updatedCategory);
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "An error occurred while updating the category." });
      }
    }
  });
}
