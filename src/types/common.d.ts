// src/types/common.d.ts
export interface ApiResponse<T> {
    data?: T;
    message: string;
    error?: any;
  }