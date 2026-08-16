import { Router } from "express";
import { healthRouter } from "./health.route";
import { receiptRouter } from "./receipt.route";

export const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use(receiptRouter);
