import express from "express";

import {authenticate} from "../middleware/authMiddleware";

import {createExpense, getExpenses, updateExpense, deleteExpense, getExpenseById} from "../controllers/expenseController";

const router = express.Router();

router.post("/",authenticate,createExpense);
router.get("/",authenticate,getExpenses);
router.put("/:id",authenticate,updateExpense);
router.delete("/:id",authenticate,deleteExpense);
router.get("/:id",authenticate,getExpenseById);

export default router;