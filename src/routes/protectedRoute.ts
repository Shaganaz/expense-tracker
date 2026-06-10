import express from "express";
import {
  authenticate,
  AuthRequest
} from "../middleware/authMiddleware";

const router = express.Router();

router.get(
  "/",
  authenticate,
  (req: AuthRequest, res) => {

    res.json({
      success: true,
      user: req.user
    });

  }
);

export default router;