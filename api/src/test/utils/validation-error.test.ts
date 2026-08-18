import { describe, expect, it } from "vitest";
import { z } from "zod";
import { formatValidationError } from "../../utils/validation-error";

describe("formatValidationError", () => {
  it("formats the first issue with its path", () => {
    const result = z.object({ name: z.string().min(1, "Bắt buộc") }).safeParse({ name: "" });
    if (result.success) {
      throw new Error("Expected validation to fail");
    }

    expect(formatValidationError(result.error)).toBe("name: Bắt buộc");
  });

  it("uses body when issue path is empty", () => {
    const error = new z.ZodError([
      {
        code: "custom",
        message: "Payload không hợp lệ",
        path: []
      }
    ]);

    expect(formatValidationError(error)).toBe("body: Payload không hợp lệ");
  });

  it("returns fallback message when issues array is empty", () => {
    const error = new z.ZodError([]);

    expect(formatValidationError(error)).toBe("Payload không hợp lệ.");
  });
});
