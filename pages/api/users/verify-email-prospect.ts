import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.query;

  if (!process.env.APP_SECRET) {
    console.error("JWT secret is not defined in the environment variables");
    res
      .status(500)
      .json({
        error: "JWT secret is not defined in the environment variables",
      });
    return;
  }

  if (req.method === "GET") {
    try {
      const decoded = jwt.verify(token as string, process.env.APP_SECRET) as {
        email: string;
      };

      const { email } = decoded;

      const prospect = await prisma.waitingListEmail.findFirst({
        where: { email },
      });

      if (!prospect) {
        console.error("Prospect not found for email:", email);
        res.status(400).json({ error: "Invalid token or email" });
        return;
      }

      const updatedProspect = await prisma.waitingListEmail.updateMany({
        where: { email, token: token as string },
        data: { verify: true, token: null },
      });

      if (updatedProspect.count === 0) {
        console.error("Invalid token or email");
        res.status(400).json({ error: "Invalid token or email" });
        return;
      }

      res.status(200).json({ success: true });
    } catch (error: any) {
      console.error("Error occurred:", error);
      res
        .status(500)
        .json({ error: "Something went wrong", message: error.message });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    console.error("Method not allowed");
    res.status(405).json({ error: "Method not allowed" });
  }
}
