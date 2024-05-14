import axios from 'axios';
import { Movie, MovieDetails } from '../interfaces/_movies_interfaces';
import { modal, showModal } from "../../components/_modal";
import { AirTable } from './_airtable';
import { searchMoviesMarkup, showMoviesMarkup } from './_movies_markup';

const searchMovie = document.getElementById('search-movie') as HTMLInputElement;
const delay = 1500;
const movieCards = document.querySelector('#movie-cards') as HTMLButtonElement
const API_KEY = import.meta.env.VITE_API_KEY;
const airTableRecord = import.meta.env.VITE_AIRTABLE_RECORD;
const AirTableDB = new AirTable()
const moviesButton = document.getElementById('btn-movies') as HTMLDivElement;

let typingTimer: ReturnType<typeof setTimeout>;

async function searchMovies(movieName: string) {
    const response = await axios.get(`https://www.omdbapi.com/?s=${movieName}&apikey=${API_KEY}&plot=full&y=`);
    renderMovies(response.data.Search, movieName);
}

function renderMovies(movies: Movie[], movieName: string = '') {
    if(!movies) {
        movieCards.innerHTML = `<h3 class="text-center">No movies found with <span class="text-primary">${movieName}</span> name</h3>`
        return
    }
    movieCards.innerHTML = ''
    movies.forEach((movie: Movie, index: number) => {
        movieName && movieCards.insertAdjacentHTML('beforeend', searchMoviesMarkup(movie, index))
        !movieName && movieCards.insertAdjacentHTML('beforeend', showMoviesMarkup(movie, index))
    });
}

async function getMovieDetails(movieName: string) {
    const response = await axios.get(`https://www.omdbapi.com/?i=${movieName}&apikey=${API_KEY}&plot=full&y=`);
    return response.data;
}

function renderMovie(movie:MovieDetails) {
    // We have to use movie.imdbID || movie.IMDB_ID because
    // imdbID is the property of OMDB and IMDB_ID is airtable
    modal.innerHTML = '';
    modal.insertAdjacentHTML('beforeend', `
    <div class="modal__content">
        <button class="modal__close">&times;</button>
        <div class="modal__primary-details">
            <img class="poster" src="${movie.Poster}" alt="Movie Poster">
            <h2 class="mt-s">${movie.Title} (${movie.Year})</h2>
            <p>${movie.Type} - ${movie.Runtime}</p>
        </div>
        <div class="modal__secondary-details">
            <p class="movie-text mb-s">${movie.Plot}</p>
            <p>Genre: ${movie.Genre}</p>
            <p class="my-xs">IMDB: ${movie.Ratings[0]?.Value || 'N/A'} | Rotten: ${movie.Ratings[1]?.Value || 'N/A'}</p>
            <p>Country: ${movie.Country}</p>
            <p class="my-xs">Language: ${movie.Language}</p>
            <p>Box Office: ${movie.BoxOffice}</p>
        </div>
    </div>
    `);
    showModal(modal)
}

movieCards.addEventListener('click', async (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('btn--movie-details')) {
        const movieID = target.dataset.imdbid;
        movieID && renderMovie(await getMovieDetails(movieID))
        return
    } else if (target.classList.contains('btn--movie-add')) {
        const movieID = target.dataset.imdbid;
        movieID && addMovie(movieID)
        return
    }
});

async function createCountryButtons() {
    const countries = await AirTableDB.getCountryList()
    for (const country of countries) {
        moviesButton.insertAdjacentHTML('beforeend', `<button class="btn" data-country="${country}">${country} Movies</button>`)
    }
}

createCountryButtons()

async function addMovie(movieID:string) {
    const movieDetails = await getMovieDetails(movieID)
    const country:string = movieDetails.Country.split(',').shift()?.trim()
    const countries = await AirTableDB.getCountryList()
    if (countries.includes(country)) {
        AirTableDB.addMovie(country, movieDetails)
    } else {
        AirTableDB.addMovie(airTableRecord, movieDetails)
    }
}

searchMovie.addEventListener('input', () => {
    clearTimeout(typingTimer);  // Clear the previous timer
    // Start a new timer that code will execute after the specified delay
    typingTimer = setTimeout(() => {
        if (searchMovie.value.length < 3) {
            movieCards.innerHTML = '<h3 class="text-center">Type at least 3 characters to search for a movie!</h3>'
            return
        }
        searchMovies(searchMovie.value);
    }, delay);
});

// AirTableDB.showMovies('')

export { renderMovies }
