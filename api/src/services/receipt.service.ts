import type { PoolClient } from "pg";
import { getDbPool } from "../db/pool";
import type { PersistReceipt } from "../interfaces/receipt/receipt-repository.interface";
import type { SaveReceiptResult } from "../interfaces/receipt/save-receipt-result.interface";
import { BadRequestError } from "../utils/http-error";
import { ConflictError } from "../utils/http-error";
import { numberToVietnameseWords } from "../utils/number-to-vietnamese-words";
import { formatValidationError } from "../utils/validation-error";
import type { CreateReceiptPayload } from "../validators/receipt.validator";
import { createReceiptSchema } from "../validators/receipt.validator";

async function insertItems(
  client: PoolClient,
  receiptId: string,
  payload: CreateReceiptPayload,
): Promise<void> {
  for (const [index, item] of payload.items.entries()) {
    const thanhTien = item.soLuongThucNhap * item.donGia;

    await client.query(
      `
      INSERT INTO receipt_items (
        receipt_id, stt, ten_hang, nhan_hieu, ma_so, don_vi_tinh, so_luong_chung_tu, so_luong_thuc_nhap, don_gia, thanh_tien
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `,
      [
        receiptId,
        index + 1,
        item.tenHang,
        item.nhanHieu,
        item.maSo,
        item.donViTinh,
        item.soLuongChungTu,
        item.soLuongThucNhap,
        item.donGia,
        thanhTien,
      ],
    );
  }
}

async function persistReceiptToPostgres(
  payload: CreateReceiptPayload,
): Promise<SaveReceiptResult> {
  const client = await getDbPool().connect();
  const tongTienSo = payload.items.reduce(
    (sum, item) => sum + item.soLuongThucNhap * item.donGia,
    0,
  );
  const tongTienChu = numberToVietnameseWords(tongTienSo);

  try {
    await client.query("BEGIN");

    const headerResult = await client.query<{ id: string }>(
      `
      INSERT INTO receipts (
        don_vi, bo_phan, ngay_lap, thang_lap, nam_lap, so_phieu,
        no_tai_khoan, co_tai_khoan, nguoi_giao, theo_so, so_chung_tu,
        ngay_chung_tu, thang_chung_tu, nam_chung_tu, cua, kho_nhap, dia_diem,
        so_chung_tu_kem, nguoi_lap_phieu, thu_kho, ke_toan_truong,
        tong_tien_so, tong_tien_chu, ngay_ky, thang_ky, nam_ky
      )
      VALUES (
        $1, $2, $3, $4, $5, $6,
        $7, $8, $9, $10, $11,
        $12, $13, $14, $15, $16, $17,
        $18, $19, $20, $21,
        $22, $23, $24, $25, $26
      )
      RETURNING id
      `,
      [
        payload.header.donVi,
        payload.header.boPhan,
        payload.header.ngayLap,
        payload.header.thangLap,
        payload.header.namLap,
        payload.header.soPhieu,
        payload.header.noTaiKhoan,
        payload.header.coTaiKhoan,
        payload.header.nguoiGiao,
        payload.header.theoSo,
        payload.header.soChungTu,
        payload.header.ngayChungTu,
        payload.header.thangChungTu,
        payload.header.namChungTu,
        payload.header.cua,
        payload.header.khoNhap,
        payload.header.diaDiem,
        payload.header.soChungTuKem,
        payload.header.nguoiLapPhieu,
        payload.header.thuKho,
        payload.header.keToanTruong,
        tongTienSo,
        tongTienChu,
        payload.header.ngayKy,
        payload.header.thangKy,
        payload.header.namKy,
      ],
    );

    const receiptId = headerResult.rows[0]?.id;
    if (!receiptId) {
      throw new ConflictError("Không thể lưu phiếu.");
    }

    await insertItems(client, receiptId, payload);
    await client.query("COMMIT");

    return {
      id: receiptId,
      itemCount: payload.items.length,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function saveReceipt(
  payload: unknown,
  persistReceipt: PersistReceipt = persistReceiptToPostgres,
): Promise<SaveReceiptResult> {
  const parsed = createReceiptSchema.safeParse(payload);
  if (!parsed.success) {
    throw new BadRequestError(formatValidationError(parsed.error));
  }

  return persistReceipt(parsed.data);
}
