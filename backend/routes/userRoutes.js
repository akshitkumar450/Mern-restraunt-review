import express from "express";
import {
  addUser,
  deleteUser,
  getUsers,
  login,
  register,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", addUser);
router.post("/register", register);
router.post("/login", login);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
export default router;
