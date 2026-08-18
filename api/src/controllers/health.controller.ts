import type { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { getAliveStatus } from "../services/health.service";
import { HttpResponse } from "../utils/http-response";

export function healthController(_req: Request, res: Response): void {
  new HttpResponse(res, StatusCodes.OK, ReasonPhrases.OK, getAliveStatus());
}
