import type { NextFunction, Request, Response } from "express";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { loggerMiddleware } from "../../middlewares/logger.middleware";

describe("loggerMiddleware", () => {
  const nextMock = vi.fn();
  const next = nextMock as unknown as NextFunction;
  let finishHandler: (() => void) | undefined;

  beforeEach(() => {
    nextMock.mockReset();
    finishHandler = undefined;
    vi.spyOn(console, "log").mockImplementation(() => undefined);
    vi.spyOn(Date, "now").mockReturnValueOnce(1000).mockReturnValueOnce(1042);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("logs request details when response finishes", () => {
    const req = {
      method: "POST",
      originalUrl: "/api/v1/receipts",
      header: vi.fn().mockReturnValue("req-123")
    } as unknown as Request;
    const res = {
      statusCode: 201,
      on: vi.fn((event: string, handler: () => void) => {
        if (event === "finish") {
          finishHandler = handler;
        }
      })
    } as unknown as Response;

    loggerMiddleware(req, res, next);
    finishHandler?.();

    expect(nextMock).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(
      "[req-123] POST /api/v1/receipts -> 201 (42ms)"
    );
  });

  it("uses dash when request id is missing", () => {
    const req = {
      method: "GET",
      originalUrl: "/api/v1/health",
      header: vi.fn().mockReturnValue(undefined)
    } as unknown as Request;
    const res = {
      statusCode: 200,
      on: vi.fn((event: string, handler: () => void) => {
        if (event === "finish") {
          finishHandler = handler;
        }
      })
    } as unknown as Response;

    loggerMiddleware(req, res, next);
    finishHandler?.();

    expect(console.log).toHaveBeenCalledWith(
      "[-] GET /api/v1/health -> 200 (42ms)"
    );
  });
});
