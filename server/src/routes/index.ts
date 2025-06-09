import { Router } from "express";
import authRoutes from "./auth-routes.js";
import apiRoutes from "./api/index.js";
import { authenticateToken } from "../middleware/auth.js";

const router = Router();

// Public auth endpoints
router.use("/auth", authRoutes);

// Protect all other API routes
router.use("/api", authenticateToken, apiRoutes);

export default router;
