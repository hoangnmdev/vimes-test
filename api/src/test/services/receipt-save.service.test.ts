import { StatusCodes } from "http-status-codes";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getDbPool } from "../../db/pool";
import type { PersistReceipt } from "../../interfaces/receipt/receipt-repository.interface";
import { saveReceipt } from "../../services/receipt.service";
import { HttpError } from "../../utils/http-error";
import { createValidReceiptPayload } from "../helpers/receipt-payload.factory";

vi.mock("../../db/pool", () => ({
  getDbPool: vi.fn()
}));

describe("saveReceipt", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("saves receipt and items when payload is valid", async () => {
    const persistReceipt = vi.fn<PersistReceipt>().mockResolvedValue({
      id: "receipt-1",
      itemCount: 1
    });
    const payload = createValidReceiptPayload();

    const result = await saveReceipt(payload, persistReceipt);

    expect(result).toEqual({
      id: "receipt-1",
      itemCount: 1
    });
    expect(persistReceipt).toHaveBeenCalledTimes(1);
    expect(persistReceipt).toHaveBeenCalledWith(payload);
  });

  it("rejects invalid payload and does not persist", async () => {
    const persistReceipt = vi.fn<PersistReceipt>();
    const invalidPayload = {
      ...createValidReceiptPayload(),
      items: []
    };

    await expect(saveReceipt(invalidPayload, persistReceipt)).rejects.toMatchObject({
      statusCode: StatusCodes.BAD_REQUEST,
      code: "VALIDATION_ERROR"
    });
    expect(persistReceipt).not.toHaveBeenCalled();
  });

  it("propagates repository errors", async () => {
    const repositoryError = new Error("database down");
    const persistReceipt = vi.fn<PersistReceipt>().mockRejectedValue(repositoryError);

    await expect(saveReceipt(createValidReceiptPayload(), persistReceipt)).rejects.toBe(
      repositoryError
    );
  });

  it("returns HttpError type for validation failure", async () => {
    const persistReceipt = vi.fn<PersistReceipt>();
    const payload = createValidReceiptPayload({}, { donGia: -1 });

    await expect(saveReceipt(payload, persistReceipt)).rejects.toBeInstanceOf(HttpError);
  });

  it("persists using default postgres flow and commits transaction", async () => {
    const query = vi
      .fn()
      .mockResolvedValueOnce({ rows: [] }) // BEGIN
      .mockResolvedValueOnce({ rows: [{ id: "receipt-db-1" }] }) // INSERT receipts
      .mockResolvedValueOnce({ rows: [] }) // INSERT item 1
      .mockResolvedValueOnce({ rows: [] }); // COMMIT
    const release = vi.fn();
    const connect = vi.fn().mockResolvedValue({ query, release });
    vi.mocked(getDbPool).mockReturnValue({ connect } as never);

    const result = await saveReceipt(createValidReceiptPayload());

    expect(result).toEqual({ id: "receipt-db-1", itemCount: 1 });
    expect(connect).toHaveBeenCalledTimes(1);
    expect(query).toHaveBeenCalledWith("BEGIN");
    expect(query).toHaveBeenCalledWith("COMMIT");
    expect(query).not.toHaveBeenCalledWith("ROLLBACK");
    expect(release).toHaveBeenCalledTimes(1);
  });

  it("rolls back and rethrows when insert fails", async () => {
    const dbError = new Error("insert failed");
    const query = vi
      .fn()
      .mockResolvedValueOnce({ rows: [] }) // BEGIN
      .mockRejectedValueOnce(dbError) // INSERT receipts fails
      .mockResolvedValueOnce({ rows: [] }); // ROLLBACK
    const release = vi.fn();
    const connect = vi.fn().mockResolvedValue({ query, release });
    vi.mocked(getDbPool).mockReturnValue({ connect } as never);

    await expect(saveReceipt(createValidReceiptPayload())).rejects.toBe(dbError);

    expect(query).toHaveBeenCalledWith("ROLLBACK");
    expect(release).toHaveBeenCalledTimes(1);
  });

  it("rolls back when header insert returns no id", async () => {
    const query = vi
      .fn()
      .mockResolvedValueOnce({ rows: [] }) // BEGIN
      .mockResolvedValueOnce({ rows: [] }) // INSERT receipts without id
      .mockResolvedValueOnce({ rows: [] }); // ROLLBACK
    const release = vi.fn();
    const connect = vi.fn().mockResolvedValue({ query, release });
    vi.mocked(getDbPool).mockReturnValue({ connect } as never);

    await expect(saveReceipt(createValidReceiptPayload())).rejects.toThrow(
      "Cannot persist receipt."
    );

    expect(query).toHaveBeenCalledWith("ROLLBACK");
    expect(release).toHaveBeenCalledTimes(1);
  });
});
