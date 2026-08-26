import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

interface NextApiRequestWithAuth extends NextApiRequest {
  user: string | object;
}

export default function verifyToken(
  req: NextApiRequestWithAuth,
  res: NextApiResponse,
  next: () => void
) {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      throw new Error("Authorization header is missing");
    }

    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    req.user = jwt.verify(token, process.env.APP_SECRET);
    next();
  } catch (err) {
    console.error(err);
    res.status(401).end();
  }
}
