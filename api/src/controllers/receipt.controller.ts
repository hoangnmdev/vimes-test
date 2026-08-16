import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getReceiptPlaceholder } from "../services/receipt.service";

export function receiptPlaceholderController(
  _req: Request,
  res: Response
): void {
  res.status(StatusCodes.OK).json({
    success: true,
    data: getReceiptPlaceholder()
  });
}
