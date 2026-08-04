import { Response } from "express";
import pool from "../config/db";
import { AuthRequest } from "../middleware/authMiddleware";
import { RowDataPacket } from "mysql2";

export const getTotalExpenses = async (req: AuthRequest, res: Response) =>
{
    try{
        const userId=req.user?.id;
        const [rows]=await pool.query<RowDataPacket[]>(
            "SELECT SUM(amount) as total FROM expenses WHERE user_id=?",
            [userId]
        );
        res.status(200).json({
            success: true,
            total: rows[0].total
        });
    }
    catch (error){
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

export const getCategoryTotals = async (req: AuthRequest, res: Response) =>
{
    try{
        const userId=req.user?.id;
        const [rows]=await pool.query<RowDataPacket[]>(
            "SELECT category, SUM(amount) as total FROM expenses WHERE user_id=? GROUP BY category",
            [userId]
        );
        res.status(200).json({
            success: true,
            data: rows
        });
    }
    catch (error){
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

export const getMonthlyTotals = async (
    req: AuthRequest,
    res: Response
) => {
    try {

        const userId = req.user?.id;

        const [rows] = await pool.query<RowDataPacket[]>(
            `
            SELECT
                MONTH(expense_date) AS month,
                SUM(amount) AS total
            FROM expenses
            WHERE user_id = ?
            GROUP BY MONTH(expense_date)
            ORDER BY MONTH(expense_date)
            `,
            [userId]
        );

        res.json({
            success: true,
            data: rows
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false
        });

    }
};