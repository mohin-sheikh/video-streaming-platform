import { Router } from "express";

import { createUserSchema } from "../schemas/user.schema";
import validateMiddleware from "../middlewares/validate.middleware";
import { createUserHandler } from "../controllers/user.controller";

const router = Router();

router.post("/", validateMiddleware(createUserSchema), createUserHandler);

export default router;
