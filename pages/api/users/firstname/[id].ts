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
          const { firstname } = req.body;

          if (!id) {
            return res.status(400).json({ error: "User ID is required" });
          }

          // Vérifiez que l'utilisateur qui fait la requête est le même que celui qui est mis à jour
          if (req.user.userId !== Number(id)) {
            return res.status(403).json({ error: "Unauthorized" });
          }
          const user = await prisma.user.update({
            where: { id: Number(id) },
            data: { firstname },
          });

          return res.status(200).json(user);
        } catch (error: any) {
          return res.status(500).json({ error: error.message });
        }

      default:
        res.setHeader("Allow", ["PUT"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  });
}
