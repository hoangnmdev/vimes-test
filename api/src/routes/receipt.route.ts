import { Router } from "express";
import { receiptPlaceholderController } from "../controllers/receipt.controller";

export const receiptRouter = Router();

receiptRouter.get("/receipts", receiptPlaceholderController);
