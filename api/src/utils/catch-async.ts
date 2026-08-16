import { NextFunction, Request, RequestHandler, Response } from "express";

/**
 *
 * @param fn - The request handler function to catch errors from.
 * @returns - A new request handler function that catches errors and passes them to the next middleware.
 */
export const catchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
