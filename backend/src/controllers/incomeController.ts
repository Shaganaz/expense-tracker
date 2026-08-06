import { Request, Response } from "express";
import pool from "../config/db";
import { AuthRequest } from "../middleware/authMiddleware";

export const saveIncome = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const { month, income } = req.body;
    const userId = req.user?.id;

    await pool.query(
      `
      INSERT INTO income (user_id, month, income)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE
      income = VALUES(income)
      `,
      [userId, month, income]
    );

    res.json({
      success: true,
      message: "Income saved successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
    });
  }
};

export const getIncome = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const userId = req.user?.id;
    const { month } = req.params;

    const [rows]: any = await pool.query(
      `
      SELECT income
      FROM income
      WHERE user_id = ?
      AND month = ?
      `,
      [userId, month]
    );

    res.json({
      income: rows.length ? rows[0].income : null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
    });
  }
};