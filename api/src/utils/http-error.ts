import { StatusCodes } from "http-status-codes";

export class HttpError extends Error {
  public readonly statusCode: number;
  public readonly code: string;

  constructor(statusCode: number, code: string, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string) {
    super(StatusCodes.BAD_REQUEST, "BAD_REQUEST", message);
  }
}

export class ConflictError extends HttpError {
  constructor(message: string) {
    super(StatusCodes.CONFLICT, "CONFLICT", message);
  }
}
