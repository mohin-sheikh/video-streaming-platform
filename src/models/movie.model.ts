import mongoose from "mongoose";
import customId from "../utils/customId";

const ratingSchema = new mongoose.Schema({
    source: {
        type: String,
        default: 'N/A',
    },
    value: {
        type: String,
        default: 'N/A',
    },
});

const movieGenres = [
    "Action", "Adventure", "Animation", "Biography", "Comedy", "Crime",
    "Documentary", "Drama", "Family", "Fantasy", "Film Noir", "History",
    "Horror", "Music", "Musical", "Mystery", "Romance", "Sci-Fi", "Sport",
    "Thriller", "War", "Western",
];

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
        description: {
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
            required: true,
        },
        ratings: [ratingSchema],
        imdbRating: {
            type: String,
            default: 'N/A',
        },
        imdbVotes: {
            type: String,
            default: 'N/A',
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
