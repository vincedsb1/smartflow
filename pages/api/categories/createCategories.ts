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

    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    const { userId } = req.user;
    console.log("user:", req.user);

    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const { name, colorId } = req.body;

    if (!name || !colorId) {
      return res.status(400).json({ message: "Name and colorId are required" });
    }

    try {
      const newCategory = await prisma.category.create({
        data: {
          name,
          colorId,
          userId,
        },
      });

      return res.status(201).json(newCategory);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while creating the category" });
    }
  });
}
