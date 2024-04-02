import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    console.log("req.body : ", req.body);

    try {
      const user = await prisma.user.findFirst({
        where: {
          email: email,
        },
      });

      console.log("user : ", user);

      if (user && (await argon2.verify(user.password, password))) {
        console.log(user.id);
        const token = sign({ userId: user.id }, process.env.APP_SECRET, {
          expiresIn: "7d",
          // expiresIn: "1h",
        });

        console.log("Token generated:", token);

        res.json({ status: "ok", token });
      } else {
        res.status(401).json({ error: "Mot de passe incorrect" });
      }
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }
}
