import { Request } from "express";
import { ApiResponse } from "./common";

export interface JwtPayload {
  id: string;
  email: string;
}



export interface RegisterRequestBody {
  email: string;
  password: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export type AuthResponseType = ApiResponse<{ token: string }>;