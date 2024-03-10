import {
    ClientSession,
    DocumentDefinition,
    FilterQuery,
    QueryOptions,
    UpdateQuery,
} from "mongoose";
import MovieModel, { IMovieDocument } from "../models/movie.model";
import { getIMDbRating } from "./imdb.rating.service";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import config from "../config";
import { UploadedFile } from "express-fileupload";

const s3 = new S3Client({
    credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
    },
});
export async function createMovieService(
    input: DocumentDefinition<Omit<IMovieDocument, "createdAt" | "updatedAt">>,
    session: ClientSession
) {
    input.title = input.title.trim();
    const getIMDBRating = await getIMDbRating(input.title);

    if (getIMDBRating !== undefined && getIMDBRating !== null) {
        const { imdbRating = "N/A", imdbVotes = "N/A", Metascore = "N/A", Ratings = [] } = getIMDBRating;

        input.imdbRating = imdbRating;
        input.imdbVotes = imdbVotes;
        input.metaScore = Metascore;
        input.ratings = Ratings.map(({ Source = "N/A", Value = "N/A" }) => ({ source: Source, value: Value }));
    }

    return await MovieModel.create([input], { session });
}

export async function uploadFilesService(
    files: { images?: UploadedFile[]; movie?: UploadedFile },
    movieId: string,
    session: ClientSession
) {
    const { images, movie } = files;

    let imageUrls = [];
    let movieKey;

    for (const image of images!) {
        const imageKey = `images/${new Date().toISOString().replace(/[\s:]+/g, '-')}${image.name.trim().replace(/\s/g, '_')}`;
        const imageParams = {
            Bucket: config.s3BucketName,
            Key: imageKey,
            Body: image.data,
        };
        await s3.send(new PutObjectCommand(imageParams));
        imageUrls.push(`https://${config.s3BucketName}.s3.${config.s3BucketRegion}.amazonaws.com/${imageKey}`);
    }

    if (movie) {
        movieKey = `movies/${new Date().toISOString().replace(/[\s:]+/g, '-')}${movie.name.trim().replace(/\s/g, '_')}`;
        const movieParams = {
            Bucket: config.s3BucketName,
            Key: movieKey,
            Body: movie.data,
        };
        await s3.send(new PutObjectCommand(movieParams));
    }

    const movieDocument = {
        imageUrl: imageUrls,
        movieUrl: movie ? `https://${config.s3BucketName}.s3.${config.s3BucketRegion}.amazonaws.com/${movieKey}` : '',
    };

    await MovieModel.updateOne({ movieId }, movieDocument, { session });

    const updatedMovie = await MovieModel.findOne({ movieId }).session(session);

    return { movie: updatedMovie };
}

export async function findMovieService(
    query: FilterQuery<IMovieDocument>,
    options: QueryOptions = { lean: true }
) {
    return await MovieModel.findOne(query, {}, options);
}

export async function findAndUpdateMovieService(
    query: FilterQuery<IMovieDocument>,
    update: UpdateQuery<IMovieDocument>,
    options: QueryOptions
) {
    return await MovieModel.findOneAndUpdate(query, update, options);
}

export async function deleteMovieService(query: FilterQuery<IMovieDocument>) {
    return await MovieModel.deleteOne(query);
}
