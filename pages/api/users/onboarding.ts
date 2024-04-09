import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userEmail } = req.body;

  // Get user by email
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  // Update user
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { onBoarding: true },
  });

  res.json(updatedUser);
}
