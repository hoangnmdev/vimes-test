import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { errorHandlerMiddleware } from "../../middlewares/error-handler.middleware";
import { BadRequestError } from "../../utils/http-error";

describe("errorHandlerMiddleware", () => {
  const status = vi.fn();
  const json = vi.fn();
  const res = { status, json } as unknown as Response;
  const req = {} as Request;
  const next = vi.fn() as NextFunction;

  beforeEach(() => {
    status.mockReset();
    json.mockReset();
    status.mockReturnValue(res);
    vi.spyOn(console, "error").mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns structured response for HttpError", () => {
    const error = new BadRequestError("items: Cần ít nhất một dòng hàng hóa");

    errorHandlerMiddleware(error, req, res, next);

    expect(status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(json).toHaveBeenCalledWith({
      success: false,
      error: {
        code: "BAD_REQUEST",
        message: "items: Cần ít nhất một dòng hàng hóa"
      }
    });
  });

  it("returns 500 for unknown errors", () => {
    errorHandlerMiddleware(new Error("unexpected"), req, res, next);

    expect(console.error).toHaveBeenCalledWith("Unhandled error:", expect.any(Error));
    expect(status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(json).toHaveBeenCalledWith({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal server error"
      }
    });
  });
});
