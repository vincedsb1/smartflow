import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// récupérer le firstname, email et birthday de l'utilisateur
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { email } = req.body;

    try {
      const user = await prisma.user.findFirst({
        where: {
          email: email,
        },
      });

      if (user) {
        res.json({
          firstname: user.firstname,
          email: user.email,
          birthday: user.birthday,
        });
      } else {
        res.status(401).json({ error: "Utilisateur non trouvé" });
      }
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }
}
