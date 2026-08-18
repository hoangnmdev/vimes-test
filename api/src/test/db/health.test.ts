import { beforeEach, describe, expect, it, vi } from "vitest";
import { checkDbReadiness } from "../../db/health";
import { getDbPool } from "../../db/pool";

vi.mock("../../db/pool", () => ({
  getDbPool: vi.fn()
}));

describe("checkDbReadiness", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns true when database query succeeds", async () => {
    const query = vi.fn().mockResolvedValue({ rows: [{ "?column?": 1 }] });
    vi.mocked(getDbPool).mockReturnValue({ query } as never);

    await expect(checkDbReadiness()).resolves.toBe(true);
    expect(query).toHaveBeenCalledWith("SELECT 1");
  });

  it("returns false when database query fails", async () => {
    const query = vi.fn().mockRejectedValue(new Error("connection refused"));
    vi.mocked(getDbPool).mockReturnValue({ query } as never);

    await expect(checkDbReadiness()).resolves.toBe(false);
  });
});
