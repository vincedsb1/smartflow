import { NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";

export default function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = verify(token, process.env.APP_SECRET);
      return res.status(200).json({ status: "ok", decoded });
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
