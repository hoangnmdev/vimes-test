import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createReceiptController } from "../../controllers/receipt.controller";
import * as receiptService from "../../services/receipt.service";
import { HttpError } from "../../utils/http-error";
import { createValidReceiptPayload } from "../helpers/receipt-payload.factory";

describe("createReceiptController", () => {
  const status = vi.fn();
  const json = vi.fn();
  const res = { status, json } as unknown as Response;

  beforeEach(() => {
    status.mockReset();
    json.mockReset();
    status.mockReturnValue(res);
  });

  it("returns 201 when service saves successfully", async () => {
    const payload = createValidReceiptPayload();
    const req = { body: payload } as Request;
    const saveReceiptSpy = vi
      .spyOn(receiptService, "saveReceipt")
      .mockResolvedValue({ id: "receipt-1", itemCount: 1 });

    await createReceiptController(req, res);

    expect(saveReceiptSpy).toHaveBeenCalledWith(payload);
    expect(status).toHaveBeenCalledWith(StatusCodes.CREATED);
    expect(json).toHaveBeenCalledWith({
      statusCode: StatusCodes.CREATED,
      message: "Created",
      data: { id: "receipt-1", itemCount: 1 }
    });
  });

  it("rejects when service fails", async () => {
    const req = { body: createValidReceiptPayload() } as Request;
    const serviceError = new HttpError(
      StatusCodes.BAD_REQUEST,
      "VALIDATION_ERROR",
      "Payload invalid"
    );
    vi.spyOn(receiptService, "saveReceipt").mockRejectedValue(serviceError);

    await expect(createReceiptController(req, res)).rejects.toBe(serviceError);
    expect(status).not.toHaveBeenCalled();
  });
});
