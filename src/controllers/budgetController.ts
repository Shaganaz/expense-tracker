import { Response } from "express";
import pool from "../config/db";
import { AuthRequest } from "../middleware/authMiddleware";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export const saveBudget = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;

    const { month, budget } = req.body;

    await pool.query(
      `
      INSERT INTO budgets (user_id, month, budget)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE
      budget = VALUES(budget)
      `,
      [userId, month, budget]
    );

    res.status(200).json({
      success: true,
      message: "Budget saved successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getBudget = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    const userId = req.user?.id;

    const month = req.params.month;

    const [rows] = await pool.query<RowDataPacket[]>(
      `
      SELECT budget
      FROM budgets
      WHERE user_id = ?
      AND month = ?
      `,
      [userId, month]
    );

    if (rows.length === 0) {

      return res.json({
        success: true,
        budget: null,
      });

    }

    res.json({
      success: true,
      budget: rows[0].budget,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });

  }
};