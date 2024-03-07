import { NextFunction, Request, Response } from "express";
import {
    TCreateMovieSchema,
} from "../schemas/movie.schema";
import {
    createMovieService
} from "../services/movie.service";

export async function createMovieHandler(
    req: Request<{}, {}, TCreateMovieSchema>,
    res: Response,
    next: NextFunction
) {
    const body: any = req.body;

    // Manually parse releaseDate into a Date object
    if (body.releaseDate) {
        body.releaseDate = new Date(body.releaseDate);
    }

    const movie = await createMovieService(body);

    return res.send({ movie });
}