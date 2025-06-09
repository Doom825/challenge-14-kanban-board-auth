import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  username: string;
  exp: number;
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;
    // attach to request
    (req as any).user = { username: payload.username };
    return next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
