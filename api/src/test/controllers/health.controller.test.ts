import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { healthController, readinessController } from "../../controllers/health.controller";
import * as healthService from "../../services/health.service";

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
      success: true,
      data: { status: "ok" }
    });
  });

  it("readinessController returns 200 when service is ok", async () => {
    vi.spyOn(healthService, "getReadyStatus").mockResolvedValue({ status: "ok" });

    await readinessController(req, res);

    expect(status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(json).toHaveBeenCalledWith({
      success: true,
      data: { status: "ok" }
    });
  });

  it("readinessController returns 503 when service is degraded", async () => {
    vi.spyOn(healthService, "getReadyStatus").mockResolvedValue({ status: "degraded" });

    await readinessController(req, res);

    expect(status).toHaveBeenCalledWith(StatusCodes.SERVICE_UNAVAILABLE);
    expect(json).toHaveBeenCalledWith({
      success: true,
      data: { status: "degraded" }
    });
  });
});
