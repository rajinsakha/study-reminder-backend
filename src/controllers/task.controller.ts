// src/controllers/task.controller.ts
import { Response, Request } from "express";
import prisma from "../config/db";
import {
  TaskResponseType,
  SingleTaskResponseType,
  CreateTaskRequestBody,
  UpdateTaskRequestBody,
} from "../types/task";

/**
 * Create a New Task
 */
export const createTask = async (
  req: Request<{}, SingleTaskResponseType, CreateTaskRequestBody>,
  res: Response<SingleTaskResponseType>
): Promise<void> => {
  const {
    title,
    description,
    category_id,
    due_date,

    priority,
    is_completed,
    reminder_minutes_before,
  } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: "User not authenticated" });
    return;
  }

  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        due_date: new Date(due_date),

        priority,
        is_completed,
        reminder_minutes_before,
        category: { connect: { id: category_id } },
        user: { connect: { id: userId } },
      },
      include: { category: true, user: true },
    });

    res
      .status(201)
      .json({ data: newTask, message: "Task created successfully" });
    return;
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
    return;
  }
};

/**
 * Get All Tasks for Logged-In User
 */
export const getUserTasks = async (
  req: Request,
  res: Response<TaskResponseType>
): Promise<void> => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ message: "User not authenticated" });
    return;
  }

  try {
    const tasks = await prisma.task.findMany({
      where: { user_id: userId },
      include: { category: true },
    });

    res.json({ data: tasks, message: "Tasks retrieved successfully" });
    return;
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
    return;
  }
};

/**
 * Get a Single Task by ID
 */
export const getTaskById = async (
  req: Request<{ id: string }>,
  res: Response<SingleTaskResponseType>
): Promise<void> => {
  const { id } = req.params;
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ message: "User not authenticated" });
    return;
  }

  try {
    const task = await prisma.task.findFirst({
      where: { id: Number(id), user_id: userId },
      include: { category: true },
    });

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.json({ data: task, message: "Task retrieved successfully" });
    return;
  } catch (error) {
    res.status(500).json({ message: "Error fetching task", error });
    return;
  }
};

/**
 * Update a Task
 */
export const updateTask = async (
  req: Request<{ id: string }, SingleTaskResponseType, UpdateTaskRequestBody>,
  res: Response<SingleTaskResponseType>
): Promise<void> => {
  const { id } = req.params;
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ message: "User not authenticated" });
    return;
  }

  try {
    // Verify the task exists and belongs to the user.
    const existingTask = await prisma.task.findFirst({
      where: { id: Number(id), user_id: userId },
    });
    if (!existingTask) {
      res.status(404).json({ message: "Task not found or access denied" });
      return;
    }

    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: req.body,
      include: { category: true },
    });

    res.json({ data: updatedTask, message: "Task updated successfully" });
    return;
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
    return;
  }
};

/**
 * Delete a Task
 */
export const deleteTask = async (
  req: Request<{ id: string }>,
  res: Response<SingleTaskResponseType>
): Promise<void> => {
  const { id } = req.params;
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ message: "User not authenticated" });
    return;
  }

  try {
    // Confirm the task exists and belongs to the user.
    const existingTask = await prisma.task.findFirst({
      where: { id: Number(id), user_id: userId },
    });
    if (!existingTask) {
      res.status(404).json({ message: "Task not found or access denied" });
      return;
    }

    await prisma.task.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Task deleted successfully" });
    return;
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
    return;
  }
};
