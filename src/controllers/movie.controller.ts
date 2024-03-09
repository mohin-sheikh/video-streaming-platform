import { NextFunction, Request, Response } from "express";
import {
    TCreateMovieSchema,
    TGetMovieSchema,
} from "../schemas/movie.schema";
import {
    createMovieService,
    findMovieService
} from "../services/movie.service";
import { CustomError } from "../utils/customError";

export async function createMovieHandler(
    req: Request<{}, {}, TCreateMovieSchema>,
    res: Response,
    next: NextFunction
) {
    const body: any = req.body;

    if (body.releaseDate) {
        body.releaseDate = new Date(body.releaseDate);
    }

    const movie = await createMovieService(body);

    return res.send({ movie });
}


export async function getMovieHandler(
    req: Request<TGetMovieSchema["params"]>,
    res: Response,
    next: NextFunction
) {
    const movieId = req.params.movieId;
    const movie = await findMovieService({ movieId });

    if (!movie) {
        return next(new CustomError("movie not found", 404));
    }

    return res.send({ movie });
}