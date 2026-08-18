import type { CreateReceiptPayload } from "../../validators/receipt.validator";
import type { SaveReceiptResult } from "./save-receipt-result.interface";

export type PersistReceipt = (
  payload: CreateReceiptPayload
) => Promise<SaveReceiptResult>;
