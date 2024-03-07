import { Router } from "express";

// individual module routes
import healthRoutes from "./health.route";
import userRoutes from "./user.route";
import sessionRoutes from "./session.route";
import itemRoutes from "./item.route";

const router = Router();

router.use(`/health`, healthRoutes);
router.use(`/users`, userRoutes);
router.use(`/sessions`, sessionRoutes);
router.use(`/items`, itemRoutes);

export default router;
