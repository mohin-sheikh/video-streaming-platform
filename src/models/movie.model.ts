import mongoose from "mongoose";
import customId from "../utils/customId";

const movieGenres = [
    "Action", "Adventure", "Animation", "Biography", "Comedy", "Crime",
    "Documentary", "Drama", "Family", "Fantasy", "Film Noir", "History",
    "Horror", "Music", "Musical", "Mystery", "Romance", "Sci-Fi", "Sport",
    "Thriller", "War", "Western",
];

export interface IMovieDocument extends mongoose.Document {
    movieId: string;
    title: string;
    releaseDate: Date;
    genre: string[];
    imageUrl: string[];
    ratings: {
        source: string;
        value: string;
    }[];
    imdbRating: string;
    imdbVotes: string;
    metaScore: string;
    type: string;
    director: string;
    runtime: string;
    released: string;
    rated: string;
    year: string;
    writer: string;
    actors: string;
    plot: string;
    language: string;
    country: string;
    awards: string;
    poster: string;
    createdAt: Date;
    updatedAt: Date;
}

const movieSchema = new mongoose.Schema(
    {
        movieId: {
            type: String,
            required: true,
            unique: true,
            default: () => `movie_${customId()}`,
        },
        title: {
            type: String,
            required: true,
        },
        releaseDate: {
            type: Date,
            required: true,
        },
        genre: {
            type: [String],
            enum: movieGenres,
            required: true,
        },
        imageUrl: {
            type: [String],
            required: false,
        },
        ratings: [
            {
                source: {
                    type: String,
                    default: 'N/A',
                },
                value: {
                    type: String,
                    default: 'N/A',
                },
            },
        ],
        imdbRating: {
            type: String,
            default: 'N/A',
        },
        imdbVotes: {
            type: String,
            default: 'N/A',
        },
        metaScore: {
            type: String,
            default: 'N/A',
        },
        quality: {
            type: String,
            required: true,
        },
        type: String,
        director: {
            type: String,
            required: true,
        },
        runtime: {
            type: String,
            required: true,
        },
        released: String,
        rated: {
            type: String,
            required: true,
        },
        year: {
            type: String,
            required: true,
        },
        writer: {
            type: String,
            required: true,
        },
        actors: {
            type: String,
            required: true,
        },
        plot: String,
        language: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        awards: String,
        poster: String,
    },
    { versionKey: false, timestamps: true }
);

const MovieModel = mongoose.model("Movie", movieSchema);

export default MovieModel;
