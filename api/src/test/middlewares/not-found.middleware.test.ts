import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { notFoundMiddleware } from "../../middlewares/not-found.middleware";

describe("notFoundMiddleware", () => {
  const status = vi.fn();
  const json = vi.fn();
  const res = { status, json } as unknown as Response;

  beforeEach(() => {
    status.mockReset();
    json.mockReset();
    status.mockReturnValue(res);
  });

  it("returns 404 with NOT_FOUND payload", () => {
    notFoundMiddleware({} as Request, res);

    expect(status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    expect(json).toHaveBeenCalledWith({
      success: false,
      error: {
        code: "NOT_FOUND",
        message: "Route not found"
      }
    });
  });
});
