import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { healthController } from "../../controllers/health.controller";

describe("health controllers", () => {
  const status = vi.fn();
  const json = vi.fn();
  const res = { status, json } as unknown as Response;
  const req = {} as Request;

  beforeEach(() => {
    status.mockReset();
    json.mockReset();
    status.mockReturnValue(res);
    vi.restoreAllMocks();
  });

  it("healthController returns alive status", () => {
    healthController(req, res);

    expect(status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(json).toHaveBeenCalledWith({
      statusCode: StatusCodes.OK,
      message: "OK",
      data: { status: "ok" }
    });
  });
});
