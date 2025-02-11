import express from "express";
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/taskController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateUser, getTasks);
router.post("/", authenticateUser, createTask);
router.put("/:id", authenticateUser, updateTask);
router.delete("/:id", authenticateUser, deleteTask);

export default router;
