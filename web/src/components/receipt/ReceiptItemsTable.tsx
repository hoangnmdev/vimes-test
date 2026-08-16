import type { ReceiptItem } from "../../types/receipt";
import { calculateLineTotal } from "../../utils/money";

type ReceiptItemsTableProps = {
  items: ReceiptItem[];
  onAddItem: () => void;
  onRemoveItem: (id: string) => void;
  onChangeItem: (id: string, field: keyof ReceiptItem, value: string | number) => void;
  itemError?: string;
};

export function ReceiptItemsTable({
  items,
  onAddItem,
  onRemoveItem,
  onChangeItem,
  itemError
}: ReceiptItemsTableProps) {
  const sumAmount = items.reduce((sum, item) => sum + calculateLineTotal(item), 0);
  const hasRemovableRow = items.length > 1;
  const lastItemId = hasRemovableRow ? items[items.length - 1].id : null;

  return (
    <section className="receipt-items">
      <table className="receipt-table">
        <colgroup>
          <col className="col-stt" />
          <col className="col-ten-hang" />
          <col className="col-ma-so" />
          <col className="col-dvt" />
          <col className="col-sl-ct" />
          <col className="col-sl-nhap" />
          <col className="col-don-gia" />
          <col className="col-thanh-tien" />
        </colgroup>
        <thead>
          <tr>
            <th rowSpan={2}>S<br />T<br />T</th>
            <th rowSpan={2}>Tên, nhãn hiệu, quy cách, phẩm chất vật tư, dụng cụ sản phẩm, hàng hóa</th>
            <th rowSpan={2}>Mã số</th>
            <th rowSpan={2}>Đơn vị tính</th>
            <th colSpan={2}>Số lượng</th>
            <th rowSpan={2}>Đơn giá</th>
            <th rowSpan={2}>Thành tiền</th>
          </tr>
          <tr>
            <th>Theo chứng từ</th>
            <th>Thực nhập</th>
          </tr>
          <tr className="index-row">
            <td>A</td>
            <td>B</td>
            <td>C</td>
            <td>D</td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>
                <input
                  value={item.tenHang}
                  onChange={(e) => onChangeItem(item.id, "tenHang", e.target.value)}
                  placeholder="Tên hàng"
                />
                <input
                  value={item.nhanHieu}
                  onChange={(e) => onChangeItem(item.id, "nhanHieu", e.target.value)}
                  placeholder="Nhãn hiệu, quy cách"
                />
              </td>
              <td>
                <input
                  value={item.maSo}
                  onChange={(e) => onChangeItem(item.id, "maSo", e.target.value)}
                />
              </td>
              <td>
                <input
                  value={item.donViTinh}
                  onChange={(e) => onChangeItem(item.id, "donViTinh", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  min={0}
                  value={item.soLuongChungTu}
                  onChange={(e) =>
                    onChangeItem(item.id, "soLuongChungTu", Number(e.target.value))
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  min={0}
                  value={item.soLuongThucNhap}
                  onChange={(e) =>
                    onChangeItem(item.id, "soLuongThucNhap", Number(e.target.value))
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  min={0}
                  value={item.donGia}
                  onChange={(e) => onChangeItem(item.id, "donGia", Number(e.target.value))}
                />
              </td>
              <td>{calculateLineTotal(item).toLocaleString("vi-VN")}</td>
            </tr>
          ))}
          <tr className="total-row">
            <td></td>
            <td className="total-label">Cộng</td>
            <td>x</td>
            <td>x</td>
            <td>x</td>
            <td>x</td>
            <td>x</td>
            <td>{sumAmount.toLocaleString("vi-VN")}</td>
          </tr>
        </tbody>
      </table>
      <div className="table-actions">
        <button type="button" onClick={onAddItem}>
          Thêm dòng
        </button>
        <button
          type="button"
          onClick={() => {
            if (lastItemId) onRemoveItem(lastItemId);
          }}
          disabled={!hasRemovableRow}
        >
          Xóa dòng cuối
        </button>
      </div>
      {itemError && <p className="error">{itemError}</p>}
    </section>
  );
}
