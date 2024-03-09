import {
    DocumentDefinition,
    FilterQuery,
    QueryOptions,
    UpdateQuery,
} from "mongoose";
import movieModel, { IMovieDocument } from "../models/movie.model";
import { getIMDbRating } from "./imdb.rating.service";

export async function createMovieService(
    input: DocumentDefinition<Omit<IMovieDocument, "createdAt" | "updatedAt">>
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

    return await movieModel.create(input);
}

export async function findMovieService(
    query: FilterQuery<IMovieDocument>,
    options: QueryOptions = { lean: true }
) {
    // the {} here is the projections
    // it can also be a space separate string
    // look in user.service.ts for an example
    return await movieModel.findOne(query, {}, options);
}

export async function findAndUpdateMovieService(
    query: FilterQuery<IMovieDocument>,
    update: UpdateQuery<IMovieDocument>,
    options: QueryOptions
) {
    return await movieModel.findOneAndUpdate(query, update, options);
}

export async function deleteMovieService(query: FilterQuery<IMovieDocument>) {
    return await movieModel.deleteOne(query);
}
