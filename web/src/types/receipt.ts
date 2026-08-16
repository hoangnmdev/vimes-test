export type ReceiptHeader = {
  donVi: string;
  boPhan: string;
  ngayLap: string;
  thangLap: string;
  namLap: string;
  soPhieu: string;
  noTaiKhoan: string;
  coTaiKhoan: string;
  nguoiGiao: string;
  theoSo: string;
  soChungTu: string;
  ngayChungTu: string;
  thangChungTu: string;
  namChungTu: string;
  cua: string;
  khoNhap: string;
  diaDiem: string;
  soChungTuKem: string;
  ngayKy: string;
  thangKy: string;
  namKy: string;
  nguoiLapPhieu: string;
  thuKho: string;
  keToanTruong: string;
};

export type ReceiptItem = {
  id: string;
  tenHang: string;
  nhanHieu: string;
  maSo: string;
  donViTinh: string;
  soLuongChungTu: number;
  soLuongThucNhap: number;
  donGia: number;
};

export type ReceiptPayload = {
  header: ReceiptHeader;
  items: ReceiptItem[];
};

export type ReceiptHeaderErrors = Partial<Record<keyof ReceiptHeader, string>>;

export type ReceiptHeaderFormProps = {
  header: ReceiptHeader;
  onChange: (field: keyof ReceiptHeader, value: string) => void;
  errors: ReceiptHeaderErrors;
};

export type ReceiptItemsTableProps = {
  items: ReceiptItem[];
  onAddItem: () => void;
  onRemoveItem: (id: string) => void;
  onChangeItem: (
    id: string,
    field: keyof ReceiptItem,
    value: string | number
  ) => void;
  itemError?: string;
};

export type ReceiptSummaryProps = {
  header: ReceiptHeader;
  onChange: (field: keyof ReceiptHeader, value: string) => void;
  totalAmount: number;
  totalAmountInWords: string;
};
