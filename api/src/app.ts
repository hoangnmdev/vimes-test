import express from "express";
import { API_PREFIX } from "./config/constants";
import { corsMiddleware } from "./middlewares/cors.middleware";
import { errorHandlerMiddleware } from "./middlewares/error-handler.middleware";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import { notFoundMiddleware } from "./middlewares/not-found.middleware";
import { requestIdMiddleware } from "./middlewares/request-id.middleware";
import { apiRouter } from "./routes";

export function createApp() {
  const app = express();

  app.use(requestIdMiddleware);
  app.use(loggerMiddleware);
  app.use(corsMiddleware);
  app.use(express.json());

  app.use(API_PREFIX, apiRouter);

  app.use(notFoundMiddleware);
  app.use(errorHandlerMiddleware);

  return app;
}
