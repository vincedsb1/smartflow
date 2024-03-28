import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import verifyToken from "../../api/auth/authMiddleware";

const prisma = new PrismaClient();

interface CustomNextApiRequest extends NextApiRequest {
  user: { userId: number; iat: number; exp: number }; // Update to reflect the correct structure
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

    const { userId } = req.user; // Destructuring to get userId
    console.log("user:", req.user);

    if (!userId) {
      // Checking for userId instead of user directly
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      console.log("Fetching categories for user ID:", userId);
      const categories = await prisma.category.findMany({
        where: {
          userId: userId, // Using userId
        },
        include: {
          color: true, // Include the related color
        },
      });

      // Map over the categories to replace colorId with color name
      const categoriesWithColorName = categories.map((category) => ({
        ...category,
        colorName: category.color.name,
      }));

      return res.json(categoriesWithColorName);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "An error occurred while fetching the categories." });
    }
  });
}
