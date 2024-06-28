import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

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

      console.log(
        `Données utilisateur: ${
          user ? JSON.stringify(user) : "undefined"
        } page.tsx:136:16`
      );

      if (user) {
        console.log(
          `Données utilisateur: ${JSON.stringify(user)} page.tsx:136:16`
        );
        console.log(
          `signupDate est ${
            user.signupDate ? "défini" : "undefined"
          } dans la réponse de l'API page.tsx:141:18`
        );
        res.status(200).json(user);
      } else {
        console.log("Données utilisateur: undefined page.tsx:136:16");
        console.log(
          "signupDate est undefined dans la réponse de l'API page.tsx:141:18"
        );
        res.status(404).json({ error: "Utilisateur non trouvé" });
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
}
