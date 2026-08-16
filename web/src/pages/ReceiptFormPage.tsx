import { useMemo, useState } from "react";
import { ReceiptHeaderForm } from "../components/receipt/ReceiptHeaderForm";
import { ReceiptItemsTable } from "../components/receipt/ReceiptItemsTable";
import { ReceiptSummary } from "../components/receipt/ReceiptSummary";
import { createReceipt } from "../services/receiptApi";
import type { ReceiptHeader, ReceiptItem } from "../types/receipt";
import { calculateGrandTotal } from "../utils/money";
import { numberToVietnameseWords } from "../utils/numberToVietnameseWords";

const initialHeader: ReceiptHeader = {
  donVi: "",
  boPhan: "",
  ngayLap: "",
  thangLap: "",
  namLap: "",
  soPhieu: "",
  noTaiKhoan: "",
  coTaiKhoan: "",
  nguoiGiao: "",
  theoSo: "",
  soChungTu: "",
  ngayChungTu: "",
  thangChungTu: "",
  namChungTu: "",
  cua: "",
  khoNhap: "",
  diaDiem: "",
  soChungTuKem: "",
  ngayKy: "",
  thangKy: "",
  namKy: "",
  nguoiLapPhieu: "",
  thuKho: "",
  keToanTruong: ""
};

function createEmptyItem(): ReceiptItem {
  return {
    id: crypto.randomUUID(),
    tenHang: "",
    nhanHieu: "",
    maSo: "",
    donViTinh: "",
    soLuongChungTu: 0,
    soLuongThucNhap: 0,
    donGia: 0
  };
}

function validateHeader(header: ReceiptHeader): Partial<Record<keyof ReceiptHeader, string>> {
  const errors: Partial<Record<keyof ReceiptHeader, string>> = {};
  if (!header.donVi.trim()) errors.donVi = "Đơn vị là bắt buộc.";
  if (!header.boPhan.trim()) errors.boPhan = "Bộ phận là bắt buộc.";
  if (!header.soPhieu.trim()) errors.soPhieu = "Số phiếu là bắt buộc.";
  if (!header.nguoiGiao.trim()) errors.nguoiGiao = "Người giao là bắt buộc.";
  if (!header.khoNhap.trim()) errors.khoNhap = "Kho nhập là bắt buộc.";
  if (!header.diaDiem.trim()) errors.diaDiem = "Địa điểm là bắt buộc.";
  return errors;
}

export function ReceiptFormPage() {
  const [header, setHeader] = useState<ReceiptHeader>(initialHeader);
  const [items, setItems] = useState<ReceiptItem[]>([createEmptyItem()]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [itemError, setItemError] = useState("");
  const [headerErrors, setHeaderErrors] = useState<
    Partial<Record<keyof ReceiptHeader, string>>
  >({});

  const totalAmount = useMemo(() => calculateGrandTotal(items), [items]);
  const totalAmountInWords = useMemo(
    () => numberToVietnameseWords(totalAmount),
    [totalAmount]
  );

  function handleHeaderChange(field: keyof ReceiptHeader, value: string) {
    setHeader((prev) => ({ ...prev, [field]: value }));
  }

  function handleAddItem() {
    setItems((prev) => [...prev, createEmptyItem()]);
  }

  function handleRemoveItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function handleChangeItem(id: string, field: keyof ReceiptItem, value: string | number) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setItemError("");

    const nextHeaderErrors = validateHeader(header);
    setHeaderErrors(nextHeaderErrors);

    const hasItem = items.some(
      (item) => item.tenHang.trim() && item.soLuongThucNhap >= 0 && item.donGia >= 0
    );
    if (!hasItem) {
      setItemError("Cần ít nhất một dòng hàng hóa hợp lệ.");
    }

    if (Object.keys(nextHeaderErrors).length > 0 || !hasItem) {
      return;
    }

    setIsSubmitting(true);
    try {
      await createReceipt({ header, items });
      setMessage("Lưu phiếu nhập kho thành công.");
    } catch (error) {
      const fallbackMessage = "Lưu phiếu nhập kho thất bại.";
      setMessage(error instanceof Error ? error.message : fallbackMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="receipt-paper-wrap">
      <form className="receipt-paper" onSubmit={handleSubmit}>
        <ReceiptHeaderForm header={header} onChange={handleHeaderChange} errors={headerErrors} />
        <ReceiptItemsTable
          items={items}
          onAddItem={handleAddItem}
          onRemoveItem={handleRemoveItem}
          onChangeItem={handleChangeItem}
          itemError={itemError}
        />
        <ReceiptSummary
          header={header}
          onChange={handleHeaderChange}
          totalAmount={totalAmount}
          totalAmountInWords={totalAmountInWords}
        />
        <button className="save-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Đang lưu..." : "Lưu phiếu"}
        </button>
        {message && <p className="status-message">{message}</p>}
      </form>
    </main>
  );
}
