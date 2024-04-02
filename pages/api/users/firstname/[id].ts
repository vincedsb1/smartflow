import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { id } = req.query; // L'ID de l'utilisateur est maintenant dans req.query

  switch (method) {
    case "PUT":
      try {
        const { firstname } = req.body;

        if (!id) {
          return res.status(400).json({ error: "User ID is required" });
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
}
