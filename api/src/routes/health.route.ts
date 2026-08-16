import { Router } from "express";
import {
  healthController,
  readinessController
} from "../controllers/health.controller";

export const healthRouter = Router();

healthRouter.get("/health", healthController);
healthRouter.get("/ready", readinessController);
