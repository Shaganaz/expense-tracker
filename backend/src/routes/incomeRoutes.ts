import { Router } from "express";
import {
  saveIncome,
  getIncome,
} from "../controllers/incomeController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authenticate, saveIncome);

router.get("/:month", authenticate, getIncome);

export default router;