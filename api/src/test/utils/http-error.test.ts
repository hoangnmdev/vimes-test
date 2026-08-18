import { StatusCodes } from "http-status-codes";
import { describe, expect, it } from "vitest";
import { BadRequestError, ConflictError, HttpError } from "../../utils/http-error";

describe("HttpError", () => {
  it("stores statusCode, code, and message", () => {
    const error = new HttpError(StatusCodes.NOT_FOUND, "NOT_FOUND", "Missing resource");

    expect(error).toBeInstanceOf(Error);
    expect(error.statusCode).toBe(StatusCodes.NOT_FOUND);
    expect(error.code).toBe("NOT_FOUND");
    expect(error.message).toBe("Missing resource");
  });
});

describe("BadRequestError", () => {
  it("uses BAD_REQUEST defaults", () => {
    const error = new BadRequestError("Payload không hợp lệ");

    expect(error).toBeInstanceOf(HttpError);
    expect(error.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(error.code).toBe("BAD_REQUEST");
    expect(error.message).toBe("Payload không hợp lệ");
  });
});

describe("ConflictError", () => {
  it("uses CONFLICT defaults", () => {
    const error = new ConflictError("Không thể lưu phiếu.");

    expect(error).toBeInstanceOf(HttpError);
    expect(error.statusCode).toBe(StatusCodes.CONFLICT);
    expect(error.code).toBe("CONFLICT");
    expect(error.message).toBe("Không thể lưu phiếu.");
  });
});
