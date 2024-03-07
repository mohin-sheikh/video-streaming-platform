import { Router } from "express";
import {
    createMovieHandler,
} from "../controllers/movie.controller";
import requireUserMiddleware from "../middlewares/requireUser.middleware";
import validate from "../middlewares/validate.middleware";
import {
    createMovieSchema,
} from "../schemas/movie.schema";

const router = Router();

router.post(
    "/",
    [requireUserMiddleware, validate(createMovieSchema)],
    createMovieHandler
);

export default router;
