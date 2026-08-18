import type { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { saveReceipt } from "../services/receipt.service";
import type { CreateReceiptPayload } from "../validators/receipt.validator";
import { HttpResponse } from "../utils/http-response";

export async function createReceiptController(
  req: Request<unknown, unknown, CreateReceiptPayload>,
  res: Response
): Promise<void> {
  const result = await saveReceipt(req.body);
  new HttpResponse(res, StatusCodes.CREATED, ReasonPhrases.CREATED, result);
}
