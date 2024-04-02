import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// récupérer le firstname, email et birthday de l'utilisateur
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    let userId;
    try {
      const decoded = jwt.verify(token, process.env.APP_SECRET);
      userId = decoded.userId;
    } catch {
      return res.status(401).json({ error: "Invalid token" });
    }

    try {
      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });

      if (user) {
        console.log("User details retrieved from database:", user);
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
