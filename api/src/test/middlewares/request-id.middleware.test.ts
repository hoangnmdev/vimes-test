import type { NextFunction, Request, Response } from "express";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { requestIdMiddleware } from "../../middlewares/request-id.middleware";

describe("requestIdMiddleware", () => {
  const nextMock = vi.fn();
  const next = nextMock as unknown as NextFunction;

  beforeEach(() => {
    nextMock.mockReset();
  });

  it("reuses incoming x-request-id header", () => {
    const setHeader = vi.fn();
    const req = {
      header: vi.fn().mockReturnValue("req-123"),
      headers: {} as Record<string, string>
    } as unknown as Request;
    const res = { setHeader } as unknown as Response;

    requestIdMiddleware(req, res, next);

    expect(setHeader).toHaveBeenCalledWith("x-request-id", "req-123");
    expect(req.headers["x-request-id"]).toBe("req-123");
    expect(nextMock).toHaveBeenCalledTimes(1);
  });

  it("generates x-request-id when header is missing", () => {
    const setHeader = vi.fn();
    const req = {
      header: vi.fn().mockReturnValue(undefined),
      headers: {} as Record<string, string>
    } as unknown as Request;
    const res = { setHeader } as unknown as Response;

    requestIdMiddleware(req, res, next);

    expect(setHeader).toHaveBeenCalledWith("x-request-id", expect.any(String));
    expect(req.headers["x-request-id"]).toEqual(expect.any(String));
    expect(nextMock).toHaveBeenCalledTimes(1);
  });
});
