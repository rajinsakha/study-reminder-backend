// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/db";
import {
  RegisterRequestBody,
  LoginRequestBody,
  AuthResponseType,
} from "../types/auth";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const register = async (
  req: Request<{}, AuthResponseType, RegisterRequestBody>,
  res: Response<AuthResponseType>
): Promise<void> => {
  const { email, password } = req.body;
 

  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user record in the database
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    // Generate a JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Registration successful", data: { token } });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const login = async (
  req: Request<{}, AuthResponseType, LoginRequestBody>,
  res: Response<AuthResponseType>
): Promise<void> => {
  const { email, password } = req.body;




  try {
    // Retrieve the user from the database
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    // Compare the provided password with the stored hash
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    // Generate the JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", data: { token } });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};
