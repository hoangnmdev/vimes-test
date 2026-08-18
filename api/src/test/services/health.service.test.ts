import { describe, expect, it } from "vitest";
import { getAliveStatus } from "../../services/health.service";

describe("health.service", () => {
  it("getAliveStatus returns ok", () => {
    expect(getAliveStatus()).toEqual({ status: "ok" });
  });
});
