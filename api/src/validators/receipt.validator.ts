import { z } from "zod";

function toIntOrDefault(defaultValue: number) {
  return z.coerce.number().int().min(0).default(defaultValue);
}

export const createReceiptItemSchema = z.object({
  tenHang: z.string().trim().min(1, "Tên hàng không được để trống"),
  nhanHieu: z.string().trim().default(""),
  maSo: z.string().trim().default(""),
  donViTinh: z.string().trim().default(""),
  soLuongChungTu: z.coerce.number().min(0).default(0),
  soLuongThucNhap: z
    .coerce.number()
    .min(0, "Số lượng thực nhập phải lớn hơn hoặc bằng 0"),
  donGia: z.coerce.number().min(0, "Đơn giá phải lớn hơn hoặc bằng 0"),
});

export const createReceiptHeaderSchema = z.object({
  donVi: z.string().trim().min(1, "Đơn vị không được để trống"),
  boPhan: z.string().trim().default(""),
  ngayLap: toIntOrDefault(0),
  thangLap: toIntOrDefault(0),
  namLap: toIntOrDefault(0),
  soPhieu: z.string().trim().min(1, "Số phiếu không được để trống"),
  noTaiKhoan: z.string().trim().default(""),
  coTaiKhoan: z.string().trim().default(""),
  nguoiGiao: z.string().trim().default(""),
  theoSo: z.string().trim().default(""),
  soChungTu: z.string().trim().default(""),
  ngayChungTu: toIntOrDefault(0),
  thangChungTu: toIntOrDefault(0),
  namChungTu: toIntOrDefault(0),
  cua: z.string().trim().default(""),
  khoNhap: z.string().trim().min(1, "Kho nhập không được để trống"),
  diaDiem: z.string().trim().min(1, "Địa điểm không được để trống"),
  soChungTuKem: z.string().trim().default(""),
  ngayKy: toIntOrDefault(0),
  thangKy: toIntOrDefault(0),
  namKy: toIntOrDefault(0),
  nguoiLapPhieu: z.string().trim().default(""),
  thuKho: z.string().trim().default(""),
  keToanTruong: z.string().trim().default(""),
});

export const createReceiptSchema = z.object({
  header: createReceiptHeaderSchema,
  items: z
    .array(createReceiptItemSchema)
    .min(1, "Cần ít nhất một dòng hàng hóa"),
});

export type CreateReceiptPayload = z.infer<typeof createReceiptSchema>;
