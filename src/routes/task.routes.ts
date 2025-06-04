import { Router } from "express";
import { createTask, getUserTasks, getTaskById, updateTask, deleteTask } from "../controllers/task.controller";
import { authenticateToken } from "../middleware/auth.middleware";


const router = Router();

router.post("/", authenticateToken, createTask);
router.get("/", authenticateToken, getUserTasks);
router.get("/:id", authenticateToken, getTaskById);
router.put("/:id", authenticateToken, updateTask);
router.delete("/:id", authenticateToken, deleteTask);

export default router;