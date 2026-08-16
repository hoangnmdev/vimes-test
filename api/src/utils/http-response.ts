import { StatusCodes } from "http-status-codes";
import type { Response } from "express";

export class HttpResponse {
  /**
   * @param res - The response object.
   * @param statusCode - The status code of the response.
   * @param message - The message of the response.
   * @param data - The data of the response.
   */
  constructor(
    res: Response,
    statusCode: StatusCodes,
    message: string,
    data?: unknown
  ) {
    res.status(statusCode).json({
      statusCode,
      message,
      data,
    });
  }
}
