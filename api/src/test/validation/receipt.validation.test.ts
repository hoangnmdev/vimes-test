import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { describe, expect, it, vi } from "vitest";
import { validateBody } from "../../middlewares/validate-body.middleware";
import { HttpError } from "../../utils/http-error";
import { createReceiptSchema } from "../../validators/receipt.validator";
import { createValidReceiptPayload } from "../helpers/receipt-payload.factory";

function createMiddlewareContext(body: unknown): {
  req: Request;
  res: Response;
  next: NextFunction;
} {
  return {
    req: { body } as Request,
    res: {} as Response,
    next: vi.fn() as NextFunction
  };
}

describe("receipt validation matrix", () => {
  const middleware = validateBody(createReceiptSchema);

  it("passes with a valid payload", () => {
    const { req, res, next } = createMiddlewareContext(createValidReceiptPayload());

    middleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it("rejects when a required header field is missing", () => {
    const payload = createValidReceiptPayload({ donVi: "" });
    const { req, res, next } = createMiddlewareContext(payload);

    expect(() => middleware(req, res, next)).toThrow(HttpError);

    try {
      middleware(req, res, next);
    } catch (error) {
      const httpError = error as HttpError;
      expect(httpError.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(httpError.code).toBe("VALIDATION_ERROR");
      expect(httpError.message).toContain("header.donVi");
    }
  });

  it("rejects when items is empty", () => {
    const payload = {
      ...createValidReceiptPayload(),
      items: []
    };
    const { req, res, next } = createMiddlewareContext(payload);

    expect(() => middleware(req, res, next)).toThrow(HttpError);
  });

  it("rejects when quantity is negative", () => {
    const payload = createValidReceiptPayload({}, { soLuongThucNhap: -1 });
    const { req, res, next } = createMiddlewareContext(payload);

    expect(() => middleware(req, res, next)).toThrow(HttpError);
  });

  it("rejects when unit price is negative", () => {
    const payload = createValidReceiptPayload({}, { donGia: -100 });
    const { req, res, next } = createMiddlewareContext(payload);

    expect(() => middleware(req, res, next)).toThrow(HttpError);
  });

  it("rejects when quantity has the wrong type", () => {
    const payload = {
      ...createValidReceiptPayload(),
      items: [{ tenHang: "But bi", soLuongThucNhap: "abc", donGia: 10000 }]
    };
    const { req, res, next } = createMiddlewareContext(payload);

    expect(() => middleware(req, res, next)).toThrow(HttpError);
  });
});
