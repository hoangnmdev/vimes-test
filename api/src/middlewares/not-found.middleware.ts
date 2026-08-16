import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export function notFoundMiddleware(_req: Request, res: Response): void {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    error: {
      code: "NOT_FOUND",
      message: "Route not found"
    }
  });
}
