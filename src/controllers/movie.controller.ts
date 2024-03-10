import { NextFunction, Request, Response } from "express";
import {
    TCreateMovieSchema,
    TGetMovieSchema,
} from "../schemas/movie.schema";
import {
    createMovieService,
    findMovieService,
    uploadFilesService
} from "../services/movie.service";
import { CustomError } from "../utils/customError";
import mongoose from "mongoose";
import { UploadedFile } from "express-fileupload";

export async function createMovieHandler(
    req: Request<{}, {}, TCreateMovieSchema["body"]>,
    res: Response,
    next: NextFunction
) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const body: any = req.body;

        if (body.releaseDate) {
            body.releaseDate = new Date(body.releaseDate);
        }

        const movie = await createMovieService(body, session);

        await session.commitTransaction();
        session.endSession();

        return res.send({ movie });
    } catch (error: any) {
        await session.abortTransaction();
        session.endSession();
        return next(new CustomError(error, 500));
    }
}

export async function uploadFilesHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const movieId = req.body.movieId;
        if (!movieId || !req.files) {
            return next(new CustomError("movieId and files are required", 400));
        }
        const files: { images?: UploadedFile[]; movie?: UploadedFile } = {
            images: req.files?.images ? (Array.isArray(req.files.images) ? req.files.images : [req.files.images]) : undefined,
            movie: req.files?.movie ? (Array.isArray(req.files.movie) ? req.files.movie[0] : req.files.movie) : undefined,
        };

        const { images } = files;

        if (!images || images.length === 0) {
            return next(new CustomError("At least one image file is required.", 400));
        }

        const result = await uploadFilesService(files, movieId, session);

        await session.commitTransaction();
        session.endSession();

        return res.send(result);
    } catch (error: any) {
        await session.abortTransaction();
        session.endSession();
        return next(new CustomError(error, 500));
    }
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