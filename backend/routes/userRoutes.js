import express from "express";
import { getAllUsers, createUser, updateUser, deleteUser } from "../controllers/userController.js";
import { authenticateUser, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin-only routes
router.get("/", authenticateUser, authorizeRoles("Admin"), getAllUsers);
router.post("/", authenticateUser, authorizeRoles("Admin"), createUser);
router.put("/:id", authenticateUser, authorizeRoles("Admin"), updateUser);
router.delete("/:id", authenticateUser, authorizeRoles("Admin"), deleteUser);

export default router;
