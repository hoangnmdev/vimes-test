import type { ReceiptPayload } from "../types/receipt";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api/v1";

export async function createReceipt(payload: ReceiptPayload): Promise<void> {
  const response = await fetch(`${API_URL}/receipts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Lưu phiếu nhập kho thất bại.");
  }
}
