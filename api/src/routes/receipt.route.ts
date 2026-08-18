import { Router } from "express";
import { createReceiptController } from "../controllers/receipt.controller";
import { validateBody } from "../middlewares/validate-body.middleware";
import { createReceiptSchema } from "../validators/receipt.validator";

export const receiptRouter = Router();

receiptRouter.post(
  "/receipts",
  validateBody(createReceiptSchema),
  createReceiptController,
);
