import express from "express";
import { authenticate } from "../middleware/authMiddleware";
import { getTotalExpenses, getCategoryTotals, getMonthlyTotals } from "../controllers/dashboardController";

const router = express.Router();

router.get("/total",authenticate,getTotalExpenses);
router.get("/category-totals",authenticate,getCategoryTotals);
router.get("/monthly-totals",authenticate,getMonthlyTotals);

export default router;