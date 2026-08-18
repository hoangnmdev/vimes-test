import type { ReceiptItem } from "../types/receipt";

export function calculateLineTotal(item: ReceiptItem): number {
  return item.soLuongThucNhap * item.donGia;
}

export function calculateGrandTotal(items: ReceiptItem[]): number {
  return items.reduce((sum, item) => sum + calculateLineTotal(item), 0);
}
