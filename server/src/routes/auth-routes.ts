import { Router, Request, Response } from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  // find user by username
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(401).json({ message: "Incorrect credentials" });
  }

  // compare password
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ message: "Incorrect credentials" });
  }

  // sign JWT
  const token = jwt.sign(
    { username: user.username },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  return res.json({ token });
};

const router = Router();

// POST /auth/login
router.post("/login", login);

export default router;
