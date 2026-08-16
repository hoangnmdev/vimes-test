import type { ReceiptHeader } from "../../types/receipt";

type ReceiptSummaryProps = {
  header: ReceiptHeader;
  onChange: (field: keyof ReceiptHeader, value: string) => void;
  totalAmount: number;
  totalAmountInWords: string;
};

export function ReceiptSummary({
  header,
  onChange,
  totalAmount,
  totalAmountInWords
}: ReceiptSummaryProps) {
  return (
    <section className="receipt-summary">
      <div className="line-field">
        <span>Tổng số tiền (viết bằng chữ):</span>
        <input value={totalAmountInWords} readOnly />
      </div>
      <div className="line-field">
        <span>Số chứng từ gốc kèm theo:</span>
        <input
          value={header.soChungTuKem}
          onChange={(e) => onChange("soChungTuKem", e.target.value)}
        />
      </div>
      <p className="amount-number">Tổng tiền số: {totalAmount.toLocaleString("vi-VN")} đồng</p>

      <div className="signature-date">
        <div className="signature-date-fields">
          <span>Ngày</span>
          <input value={header.ngayKy} onChange={(e) => onChange("ngayKy", e.target.value)} />
          <span>tháng</span>
          <input value={header.thangKy} onChange={(e) => onChange("thangKy", e.target.value)} />
          <span>năm</span>
          <input value={header.namKy} onChange={(e) => onChange("namKy", e.target.value)} />
        </div>
      </div>
      <div className="signature-grid">
        <div>
          <strong>Người lập phiếu</strong>
          <p>(Ký, họ tên)</p>
          <input
            value={header.nguoiLapPhieu}
            onChange={(e) => onChange("nguoiLapPhieu", e.target.value)}
          />
        </div>
        <div>
          <strong>Người giao hàng</strong>
          <p>(Ký, họ tên)</p>
          <input
            value={header.nguoiGiao}
            onChange={(e) => onChange("nguoiGiao", e.target.value)}
          />
        </div>
        <div>
          <strong>Thủ kho</strong>
          <p>(Ký, họ tên)</p>
          <input value={header.thuKho} onChange={(e) => onChange("thuKho", e.target.value)} />
        </div>
        <div>
          <strong>Kế toán trưởng</strong>
          <p>(Hoặc bộ phận có nhu cầu nhập)</p>
          <p>(Ký, họ tên)</p>
          <input
            value={header.keToanTruong}
            onChange={(e) => onChange("keToanTruong", e.target.value)}
          />
        </div>
      </div>
    </section>
  );
}
