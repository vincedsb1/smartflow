import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Requête reçue", req.method, req.query);

  if (req.method === "DELETE") {
    const { email } = req.query;

    try {
      const deletedEmailVerification = await prisma.emailVerification.delete({
        where: { email: email as string },
      });

      return res.json(deletedEmailVerification);
    } catch (err) {
      return res.status(500).json({ error: (err as Error).message });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: "Méthode non autorisée" });
  }
}
