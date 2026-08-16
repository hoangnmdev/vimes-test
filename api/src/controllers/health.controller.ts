import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getAliveStatus, getReadyStatus } from "../services/health.service";

export function healthController(_req: Request, res: Response): void {
  res.status(StatusCodes.OK).json({
    success: true,
    data: getAliveStatus()
  });
}

export async function readinessController(
  _req: Request,
  res: Response
): Promise<void> {
  const data = await getReadyStatus();
  const statusCode =
    data.status === "ok" ? StatusCodes.OK : StatusCodes.SERVICE_UNAVAILABLE;

  res.status(statusCode).json({
    success: true,
    data
  });
}
