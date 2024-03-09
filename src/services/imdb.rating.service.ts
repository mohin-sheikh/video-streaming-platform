import axios from 'axios';

const apiKey = process.env.OMDB_API_KEY;

export const getIMDbRating = async (movieTitle: string) => {
    try {
        const response = await axios.get(`http://www.omdbapi.com/?t=${movieTitle}&apikey=${apiKey}`);

        if (response.data && response.data.Response === 'True') {
            return response.data;
        } else {
            console.log(`Error: ${response.data.Error}`);
        }
    } catch (error: any) {
        console.error('Error fetching IMDb rating:', error.message);
    }
};

// Example Response from OMDB API
/* 
{
    "Title": "The Shawshank Redemption",
    "Year": "1994",
    "Rated": "R",
    "Released": "14 Oct 1994",
    "Runtime": "142 min",
    "Genre": "Drama",
    "Director": "Frank Darabont",
    "Writer": "Stephen King, Frank Darabont",
    "Actors": "Tim Robbins, Morgan Freeman, Bob Gunton",
    "Plot": "Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.",
    "Language": "English",
    "Country": "United States",
    "Awards": "Nominated for 7 Oscars. 21 wins & 42 nominations total",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg",
    "Ratings": [
        {
            "Source": "Internet Movie Database",
            "Value": "9.3/10"
        },
        {
            "Source": "Rotten Tomatoes",
            "Value": "91%"
        },
        {
            "Source": "Metacritic",
            "Value": "82/100"
        }
    ],
    "Metascore": "82",
    "imdbRating": "9.3",
    "imdbVotes": "2,865,799",
    "imdbID": "tt0111161",
    "Type": "movie",
    "DVD": "15 Aug 2008",
    "BoxOffice": "$28,767,189",
    "Production": "N/A",
    "Website": "N/A",
    "Response": "True"
}
*/