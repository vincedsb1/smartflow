import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

interface NextApiRequestWithAuth extends NextApiRequest {
  user: string | object; // Change 'auth' to 'user'
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
    console.log("Token received:", token);
    req.user = jwt.verify(token, process.env.APP_SECRET); // Change 'auth' to 'user'
    console.log("User decoded from token:", req.user);
    next();
  } catch (err) {
    console.error(err);

    res.status(401).end();
  }
}
