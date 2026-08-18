import { beforeEach, describe, expect, it, vi } from "vitest";
import * as dbHealth from "../../db/health";
import { getAliveStatus, getReadyStatus } from "../../services/health.service";

vi.mock("../../db/health", () => ({
  checkDbReadiness: vi.fn()
}));

describe("health.service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getAliveStatus returns ok", () => {
    expect(getAliveStatus()).toEqual({ status: "ok" });
  });

  it("getReadyStatus returns ok when database is ready", async () => {
    vi.mocked(dbHealth.checkDbReadiness).mockResolvedValue(true);

    await expect(getReadyStatus()).resolves.toEqual({ status: "ok" });
  });

  it("getReadyStatus returns degraded when database is not ready", async () => {
    vi.mocked(dbHealth.checkDbReadiness).mockResolvedValue(false);

    await expect(getReadyStatus()).resolves.toEqual({ status: "degraded" });
  });
});
