import type { CreateReceiptPayload } from "../../validators/receipt.validator";

type HeaderOverrides = Partial<CreateReceiptPayload["header"]>;
type ItemOverrides = Partial<CreateReceiptPayload["items"][number]>;

export function createValidReceiptPayload(
  headerOverrides: HeaderOverrides = {},
  itemOverrides: ItemOverrides = {}
): CreateReceiptPayload {
  return {
    header: {
      donVi: "VIMES",
      boPhan: "Kho",
      ngayLap: 18,
      thangLap: 8,
      namLap: 2026,
      soPhieu: "PNK-001",
      noTaiKhoan: "1561",
      coTaiKhoan: "331",
      nguoiGiao: "Nguyen Van A",
      theoSo: "PXK",
      soChungTu: "CT-001",
      ngayChungTu: 18,
      thangChungTu: 8,
      namChungTu: 2026,
      cua: "Nha cung cap A",
      khoNhap: "Kho A",
      diaDiem: "Ha Noi",
      soChungTuKem: "1",
      ngayKy: 18,
      thangKy: 8,
      namKy: 2026,
      nguoiLapPhieu: "Lap phieu",
      thuKho: "Thu kho",
      keToanTruong: "Ke toan",
      ...headerOverrides
    },
    items: [
      {
        tenHang: "But bi",
        nhanHieu: "TL",
        maSo: "BB-01",
        donViTinh: "Cay",
        soLuongChungTu: 2,
        soLuongThucNhap: 2,
        donGia: 10000,
        ...itemOverrides
      }
    ]
  };
}
