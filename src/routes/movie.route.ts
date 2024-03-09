import { Router } from "express";
import {
    createMovieHandler,
    getMovieHandler,
} from "../controllers/movie.controller";
import requireUserMiddleware from "../middlewares/requireUser.middleware";
import validate from "../middlewares/validate.middleware";
import {
    createMovieSchema,
    getMovieSchema,
} from "../schemas/movie.schema";

const router = Router();

router.post(
    "/",
    [requireUserMiddleware, validate(createMovieSchema)],
    createMovieHandler
);

router.get(
    "/:movieId",
    [requireUserMiddleware, validate(getMovieSchema)],
    getMovieHandler
);

export default router;
