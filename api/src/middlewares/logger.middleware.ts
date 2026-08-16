import type { NextFunction, Request, Response } from "express";

export function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const startedAt = Date.now();
  res.on("finish", () => {
    const durationMs = Date.now() - startedAt;
    const requestId = req.header("x-request-id") ?? "-";
    console.log(
      `[${requestId}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${durationMs}ms)`
    );
  });
  next();
}
