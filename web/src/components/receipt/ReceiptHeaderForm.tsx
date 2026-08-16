import type { ReceiptHeaderFormProps } from "../../types/receipt";

export function ReceiptHeaderForm({
  header,
  onChange,
  errors,
}: ReceiptHeaderFormProps) {
  return (
    <section className="receipt-header">
      <div className="receipt-meta">
        <div>
          <div className="line-field">
            <span>Đơn vị:</span>
            <input
              value={header.donVi}
              onChange={(e) => onChange("donVi", e.target.value)}
            />
          </div>
          {errors.donVi && <p className="error">{errors.donVi}</p>}
          <div className="line-field">
            <span>Bộ phận:</span>
            <input
              value={header.boPhan}
              onChange={(e) => onChange("boPhan", e.target.value)}
            />
          </div>
          {errors.boPhan && <p className="error">{errors.boPhan}</p>}
        </div>
        <div className="receipt-template">
          <p>
            Mẫu số 01 - VT
            <br />
            (Ban hành theo Thông tư số 200/2014/TT-BTC
            <br />
            Ngày 22/12/2014 của Bộ Tài chính)
          </p>
        </div>
      </div>

      <h1 className="receipt-title">PHIẾU NHẬP KHO</h1>

      <div className="header-grid">
        <div className="line-field">
          <span>Ngày</span>
          <input
            value={header.ngayLap}
            onChange={(e) => onChange("ngayLap", e.target.value)}
          />
          <span>tháng</span>
          <input
            value={header.thangLap}
            onChange={(e) => onChange("thangLap", e.target.value)}
          />
          <span>năm</span>
          <input
            value={header.namLap}
            onChange={(e) => onChange("namLap", e.target.value)}
          />
        </div>
        <div className="line-field right">
          <span>Nợ</span>
          <input
            className="account-input"
            value={header.noTaiKhoan}
            onChange={(e) => onChange("noTaiKhoan", e.target.value)}
          />
        </div>

        <div className="line-field">
          <span>Số:</span>
          <input
            value={header.soPhieu}
            onChange={(e) => onChange("soPhieu", e.target.value)}
          />
        </div>
        <div className="line-field right">
          <span>Có</span>
          <input
            className="account-input"
            value={header.coTaiKhoan}
            onChange={(e) => onChange("coTaiKhoan", e.target.value)}
          />
        </div>
      </div>
      {errors.soPhieu && <p className="error">{errors.soPhieu}</p>}

      <div className="line-field">
        <span>Họ và tên người giao:</span>
        <input
          value={header.nguoiGiao}
          onChange={(e) => onChange("nguoiGiao", e.target.value)}
        />
      </div>
      {errors.nguoiGiao && <p className="error">{errors.nguoiGiao}</p>}

      <div className="line-field">
        <span>Theo</span>
        <input
          value={header.theoSo}
          onChange={(e) => onChange("theoSo", e.target.value)}
        />
        <span>số</span>
        <input
          value={header.soChungTu}
          onChange={(e) => onChange("soChungTu", e.target.value)}
        />
        <span>ngày</span>
        <input
          value={header.ngayChungTu}
          onChange={(e) => onChange("ngayChungTu", e.target.value)}
        />
        <span>tháng</span>
        <input
          value={header.thangChungTu}
          onChange={(e) => onChange("thangChungTu", e.target.value)}
        />
        <span>năm</span>
        <input
          value={header.namChungTu}
          onChange={(e) => onChange("namChungTu", e.target.value)}
        />
        <span>của</span>
        <input
          value={header.cua}
          onChange={(e) => onChange("cua", e.target.value)}
        />
      </div>

      <div className="line-field">
        <span>Nhập tại kho:</span>
        <input
          value={header.khoNhap}
          onChange={(e) => onChange("khoNhap", e.target.value)}
        />
        <span>địa điểm:</span>
        <input
          value={header.diaDiem}
          onChange={(e) => onChange("diaDiem", e.target.value)}
        />
      </div>
      {(errors.khoNhap || errors.diaDiem) && (
        <p className="error">{errors.khoNhap ?? errors.diaDiem}</p>
      )}
    </section>
  );
}
