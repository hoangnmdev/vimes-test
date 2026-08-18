import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { ZodTypeAny } from "zod";
import { HttpError } from "../utils/http-error";
import { formatValidationError } from "../utils/validation-error";

export function validateBody(schema: ZodTypeAny) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        "VALIDATION_ERROR",
        formatValidationError(result.error)
      );
    }

    req.body = result.data;
    next();
  };
}
