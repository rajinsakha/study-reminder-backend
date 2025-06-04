// src/types/express/index.d.ts
import { JwtPayload } from "../auth"; // Adjust path if necessary

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}