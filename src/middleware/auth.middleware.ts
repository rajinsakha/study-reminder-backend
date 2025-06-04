// src/middleware/auth.middleware.ts
import {  Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import {  JwtPayload } from "../types/auth";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Use the 'authorization' header from req.headers.
  // Since we augmented Express.Request, it now has a known "authorization" property (of type string | undefined).
  const authHeader: string = req.headers.authorization || "";
  const token = authHeader.split(" ")[1]; // Expecting "Bearer <token>"

  if (!token) {
    res.status(401).json({ message: "No authentication token provided" });
    return;
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: "Invalid token" });
      return;
    }
    // Now we can safely assign to req.user because of our module augmentation.
    req.user = decoded as JwtPayload;
    next();
  });
};