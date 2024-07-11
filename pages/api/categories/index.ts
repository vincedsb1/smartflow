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

    const { userId } = req.user;

    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (req.method === "GET") {
      try {
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
      } finally {
        await prisma.$disconnect();
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
      } finally {
        await prisma.$disconnect();
      }
    } else if (req.method === "DELETE") {
      const { categoryId } = req.body;

      if (!categoryId) {
        return res
          .status(400)
          .json({ message: "Missing categoryId parameter" });
      }

      try {
        await prisma.category.delete({
          where: { id: categoryId },
        });

        return res.json({ message: "Category successfully deleted" });
      } catch (error: any) {
        console.error(error);
        if (error.code === "P2025") {
          // Handle the case where the category does not exist
          return res.status(404).json({ message: "Category not found" });
        }
        return res
          .status(500)
          .json({ message: "An error occurred while deleting the category." });
      } finally {
        await prisma.$disconnect();
      }
    }
  });
}
