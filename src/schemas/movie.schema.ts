import { object, string, array, TypeOf } from "zod";

const commonFields = {
    body: object({
        title: string({
            required_error: "Title is required",
        }),
        releaseDate: string({
            required_error: "Release date is required",
        }),
        genre: array(
            string({
                required_error: "Genre is required",
            })
        ),
        imageUrl: array(
            string({
                required_error: "ImageUrl is required",
            })
        ),
        type: string(),
        director: string({
            required_error: "Director is required",
        }),
        runtime: string({
            required_error: "Runtime is required",
        }),
        released: string({
            required_error: "Released date is required",
        }),
        rated: string({
            required_error: "Rating is required", // "Rated": "R"
        }),
        year: string({
            required_error: "Year is required",
        }),
        writer: string({
            required_error: "Writer is required",
        }),
        actors: string({
            required_error: "Actors are required",
        }),
        plot: string(),
        language: string({
            required_error: "Language is required",
        }),
        country: string({
            required_error: "Country is required",
        }),
        awards: string(),
        poster: string()
    })
};

const params = {
    params: object({
        movieId: string({
            required_error: "movieId is required",
        }),
    }),
};

export const createMovieSchema = object({ ...commonFields });
export const updateMovieSchema = object({
    ...commonFields,
    ...params
});
export const getMovieSchema = object({
    ...params
});
export const deleteMovieSchema = object({
    ...params
});

export type TCreateMovieSchema = TypeOf<typeof createMovieSchema>;
export type TUpdateMovieSchema = TypeOf<typeof updateMovieSchema>;
export type TGetMovieSchema = TypeOf<typeof getMovieSchema>;
export type TDeleteMovieSchema = TypeOf<typeof deleteMovieSchema>;
