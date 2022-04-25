import express from "express";
import {
  addReview,
  deleteReview,
  getReview,
  updateReview,
} from "../controllers/reviewController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addReview);
router.get("/:id", protect, getReview);
router.delete("/:id", protect, deleteReview);
router.patch("/:id", protect, updateReview);

export default router;
