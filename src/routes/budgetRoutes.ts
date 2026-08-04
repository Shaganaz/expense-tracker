import express from "express";
import { authenticate } from "../middleware/authMiddleware";
import {
  saveBudget,
  getBudget,
} from "../controllers/budgetController";

const router = express.Router();

router.post(
  "/",
  authenticate,
  saveBudget
);

router.get(
  "/:month",
  authenticate,
  getBudget
);

export default router;