import { Request, Response, NextFunction } from "express";
import { AppError } from "../AppError.js";

export const errorHandler = (error: unknown, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ error: true, message: error.message })
  }

  return res.status(500).json({ error: true, message: 'Unexpected error' })
}
