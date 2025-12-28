import express from "express";
import { processGameResult } from "../controllers/gameController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/game/result
router.post("/result", protect, processGameResult);

export default router;
