import { Router } from "express";

import { createSessionSchema } from "../schemas/session.schema";
import validateMiddleware from "../middlewares/validate.middleware";
import requireUserMiddleware from "../middlewares/requireUser.middleware";
import {
  createUserSessionHandler,
  deleteUserSessionHandler,
  getUserSessionsHandler,
} from "../controllers/session.controller";

const router = Router();

router.post(
  "/",
  validateMiddleware(createSessionSchema),
  createUserSessionHandler
);

router.get("/", requireUserMiddleware, getUserSessionsHandler);
router.delete("/", requireUserMiddleware, deleteUserSessionHandler);

export default router;
