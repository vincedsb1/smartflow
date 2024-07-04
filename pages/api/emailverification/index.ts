import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(
  req: { method: string; query: { token: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { error?: string; email?: string }): any; new (): any };
      end: { (arg0: string): void; new (): any };
    };
    setHeader: (arg0: string, arg1: string[]) => void;
  }
) {
  if (req.method === "GET") {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ error: "Token is required" });
    }

    try {
      const emailVerification = await prisma.emailVerification.findUnique({
        where: { token },
      });

      if (!emailVerification) {
        return res.status(404).json({ error: "Email verification not found" });
      }

      if (emailVerification.expiresAt < new Date()) {
        return res.status(400).json({ error: "Token has expired" });
      }

      return res.status(200).json({ email: emailVerification.email });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
