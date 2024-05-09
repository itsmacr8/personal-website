import axios from 'axios';
import { Movies, MovieDetails } from '../interfaces/_movies_interfaces';

const searchMovie = document.getElementById('search-movie') as HTMLInputElement;
const delay = 1500;
const movieCards = document.querySelector('#movie-cards') as HTMLButtonElement
const API_KEY = import.meta.env.VITE_API_KEY;

let typingTimer: ReturnType<typeof setTimeout>;

async function searchMovies(movieName: string) {
    const response = await axios.get(`https://www.omdbapi.com/?s=${movieName}&apikey=${API_KEY}&plot=full&y=`);
    const movies = response.data.Search;

    movies.forEach((movie:Movies, index: number) => {
        movieCards.insertAdjacentHTML('beforeend',`
        <div class="movie-card" id=${index}>
            <div><img src="${movie.Poster}" alt="Movie Poster"></div>
            <div class="card-body">
                <h2 class="movie-title">${movie.Title}<span class="title-text"> (${movie.Year})</span></h2>
                <p class="movie-text">Type: ${movie.Type}</p>
                <button class="btn btn--movie-details" data-imdbid=${movie.imdbID}>Details</button>
                <button class="btn">Watched</button>
                <a href="https://www.imdb.com/title/${movie.imdbID}/" class="btn" target="_blank" rel="noopener noreferrer">IMDB</a>
            </div>
        </div>`);
    });
}

async function getMovieDetails(movieName: string) {
    const response = await axios.get(`https://www.omdbapi.com/?i=${movieName}&apikey=${API_KEY}&plot=full&y=`);
    const data = response.data;
    renderMovie(data);
}

function renderMovie(movie:MovieDetails) {
    movieCards.insertAdjacentHTML('beforeend', `
    <div class="movie-card">
        <div><img src="${movie.Poster}" alt="Movie Poster"></div>
        <div class="card-body">
            <h2 class="movie-title">${movie.Title} (${movie.Year})</h2>
            <p>${movie.Type} - ${movie.Runtime}</p>
            <p>Genre: ${movie.Genre}</p>
            <p class="movie-text">${movie.Plot}</p>
            <p class="imdb-rating">IMDB: <span class="rating-text">${movie.Ratings[0]?.Value || 'N/A'}</span> | Rotten: <span class="rating-text">${movie.Ratings[1]?.Value || 'N/A'}</span></p>
            <p class="country">Country: <span class="country-text">${movie.Country}</span></p>
            <p class="language">Language: <span class="language-text">${movie.Language}</span></p>
            <p class="box-office">Box Office: ${movie.BoxOffice}</p>
        </div>
    </div>`);
}

movieCards.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('btn--movie-details')) {
        const movieID = target.dataset.imdbid;
        movieID && getMovieDetails(movieID)
    }
});

searchMovie.addEventListener('input', () => {
    clearTimeout(typingTimer);  // Clear the previous timer
    // Start a new timer that code will execute after the specified delay
    typingTimer = setTimeout(() => {
        (searchMovie.value.length > 2) && searchMovies(searchMovie.value);
    }, delay);
});
