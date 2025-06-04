import { ApiResponse } from "./common";

export interface ICategory {
  id: number;
  name: string;
}

export interface IUser {
  id: string;
  email: string;
}

export interface ITask {
  id: number;
  title: string;
  description: string;
  due_date: Date;
  priority: "High" | "Medium" | "Low";
  is_completed: boolean;
  reminder_minutes_before: number;
  created_at: Date;
  updated_at: Date;
  category: ICategory;
}

export interface CreateTaskRequestBody {
  title: string;
  description: string;
  category_id: number;
  due_date: string;

  priority: "High" | "Medium" | "Low";
  is_completed: boolean;
  reminder_minutes_before: number;
}

export interface UpdateTaskRequestBody {
  title?: string;
  description?: string;
  category_id?: number;
  due_date?: string;

  priority?: "High" | "Medium" | "Low";
  is_completed?: boolean;
  reminder_minutes_before?: number;
}

export type TaskResponseType = ApiResponse<ITask[]>;
export type SingleTaskResponseType = ApiResponse<ITask>;