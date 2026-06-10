import { Response } from "express";
import pool from "../config/db";
import { AuthRequest } from "../middleware/authMiddleware";
import { RowDataPacket } from "mysql2";
import { ResultSetHeader } from "mysql2";

export const createExpense = async (req: AuthRequest, res: Response) => {
  try {
    const { amount, category, description, expense_date } = req.body;

    const userId = req.user?.id;
    await pool.query(
      "INSERT INTO expenses( amount, category, description, expense_date, user_id) VALUES(?,?,?,?,?)",
      [amount, category, description, expense_date, userId],
    );
    res.status(201).json({
      success: true,
      message: "Expense added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getExpenses = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const [expenses] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM expenses WHERE user_id=? ORDER BY expense_date DESC",
      [userId],
    );
    res.status(200).json({
      success: true,
      expenses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const updateExpense = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const expenseId = req.params.id;
    const { amount, category, description, expense_date } = req.body;
    const [result] = await pool.query<ResultSetHeader>(
      "UPDATE expenses SET amount=?, category=?, description=?, expense_date=? WHERE id=? AND user_id=?",
      [amount, category, description, expense_date, expenseId, userId],
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Expense updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const deleteExpense = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const expenseId = req.params.id;
    const [result] = await pool.query<ResultSetHeader>(
      "DELETE FROM expenses WHERE id=? AND user_id=?",
      [expenseId, userId],
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getExpenseById = async (req: AuthRequest, res: Response) => {
  try {
    const expenseId = req.params.id;

    const userId = req.user?.id;

    const [expenses] = await pool.query<RowDataPacket[]>(
      `
            SELECT *
            FROM expenses
            WHERE id = ?
            AND user_id = ?
            `,
      [expenseId, userId],
    );

    if (expenses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.json({
      success: true,
      expense: expenses[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
};
