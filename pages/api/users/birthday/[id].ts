import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import verifyToken from "../../auth/authMiddleware";

const prisma = new PrismaClient();

interface CustomNextApiRequest extends NextApiRequest {
  user: { userId: number; iat: number; exp: number };
}

export default function handle(
  req: CustomNextApiRequest,
  res: NextApiResponse
) {
  verifyToken(req, res, async () => {
    const { method } = req;
    const { id } = req.query;

    switch (method) {
      case "PUT":
        try {
          const { birthday } = req.body;

          if (!id) {
            return res.status(400).json({ error: "User ID is required" });
          }

          if (req.user.userId !== Number(id)) {
            return res.status(403).json({ error: "Unauthorized" });
          }

          const user = await prisma.user.update({
            where: { id: Number(id) },
            data: { birthday },
          });

          return res.status(200).json(user);
        } catch (error: any) {
          return res.status(500).json({ error: error.message });
        } finally {
          await prisma.$disconnect();
        }

      default:
        res.setHeader("Allow", ["PUT"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  });
}
