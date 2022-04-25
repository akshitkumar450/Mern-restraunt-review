import express from "express";
import {
  createRestro,
  deleteRestro,
  getAllRestros,
  updateRestro,
  getRestro,
} from "../controllers/restroController.js";
import protect from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/", protect, getAllRestros);
router.get("/:id", getRestro);
router.post("/", createRestro);
router.delete("/:id", deleteRestro);
router.patch("/:id", updateRestro);
export default router;
