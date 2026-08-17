/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.up = (pgm) => {
  pgm.createExtension("pgcrypto", { ifNotExists: true });

  pgm.createTable("receipts", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()")
    },
    don_vi: { type: "text", notNull: true },
    bo_phan: { type: "text", notNull: true, default: "" },
    ngay_lap: { type: "integer", notNull: true },
    thang_lap: { type: "integer", notNull: true },
    nam_lap: { type: "integer", notNull: true },
    so_phieu: { type: "text", notNull: true },
    no_tai_khoan: { type: "text", notNull: true, default: "" },
    co_tai_khoan: { type: "text", notNull: true, default: "" },
    nguoi_giao: { type: "text", notNull: true },
    theo_so: { type: "text", notNull: true, default: "" },
    so_chung_tu: { type: "text", notNull: true, default: "" },
    ngay_chung_tu: { type: "integer", notNull: true, default: 0 },
    thang_chung_tu: { type: "integer", notNull: true, default: 0 },
    nam_chung_tu: { type: "integer", notNull: true, default: 0 },
    cua: { type: "text", notNull: true, default: "" },
    kho_nhap: { type: "text", notNull: true },
    dia_diem: { type: "text", notNull: true },
    so_chung_tu_kem: { type: "text", notNull: true, default: "" },
    nguoi_lap_phieu: { type: "text", notNull: true, default: "" },
    thu_kho: { type: "text", notNull: true, default: "" },
    ke_toan_truong: { type: "text", notNull: true, default: "" },
    tong_tien_so: { type: "numeric(18,2)", notNull: true, default: 0 },
    tong_tien_chu: { type: "text", notNull: true, default: "" },
    ngay_ky: { type: "integer", notNull: true, default: 0 },
    thang_ky: { type: "integer", notNull: true, default: 0 },
    nam_ky: { type: "integer", notNull: true, default: 0 },
    created_at: { type: "timestamp with time zone", notNull: true, default: pgm.func("now()") },
    updated_at: { type: "timestamp with time zone", notNull: true, default: pgm.func("now()") }
  });

  pgm.addConstraint("receipts", "receipts_unique_don_vi_so_phieu", {
    unique: ["don_vi", "so_phieu"]
  });

  pgm.createTable("receipt_items", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()")
    },
    receipt_id: {
      type: "uuid",
      notNull: true,
      references: "receipts",
      onDelete: "CASCADE"
    },
    stt: { type: "integer", notNull: true },
    ten_hang: { type: "text", notNull: true },
    nhan_hieu: { type: "text", notNull: true, default: "" },
    ma_so: { type: "text", notNull: true, default: "" },
    don_vi_tinh: { type: "text", notNull: true },
    so_luong_chung_tu: { type: "numeric(18,2)", notNull: true, default: 0 },
    so_luong_thuc_nhap: { type: "numeric(18,2)", notNull: true, default: 0 },
    don_gia: { type: "numeric(18,2)", notNull: true, default: 0 },
    thanh_tien: { type: "numeric(18,2)", notNull: true, default: 0 },
    created_at: { type: "timestamp with time zone", notNull: true, default: pgm.func("now()") },
    updated_at: { type: "timestamp with time zone", notNull: true, default: pgm.func("now()") }
  });

  pgm.addConstraint("receipt_items", "receipt_items_unique_receipt_stt", {
    unique: ["receipt_id", "stt"]
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.down = (pgm) => {
  pgm.dropTable("receipt_items", { ifExists: true });
  pgm.dropTable("receipts", { ifExists: true });
};
