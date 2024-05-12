import axios from 'axios';
import { Movie, MovieDetails } from '../interfaces/_movies_interfaces';
import { modal, showModal } from "../../components/_modal";
import { AirTable } from './_airtable';

const searchMovie = document.getElementById('search-movie') as HTMLInputElement;
const delay = 1500;
const movieCards = document.querySelector('#movie-cards') as HTMLButtonElement
const API_KEY = import.meta.env.VITE_API_KEY;
const AirTableDB = new AirTable()

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
        movieCards.insertAdjacentHTML('beforeend', `
        <div class="movie-card" id=${index}>
            <div><img class="poster" src="${movie.Poster}" alt="Movie Poster"></div>
            <div class="movie-card__body">
                <h2 class="movie-card__title">${movie.Title}<span class="title-text"> (${movie.Year})</span></h2>
                <p class="movie-text my-xs">Type: ${movie.Type}</p>
                <div class="btn-group">
                    <button class="btn btn--movie-details" data-imdbid=${movie.imdbID || movie.IMDB_ID}>Details</button>
                    <button class="btn">Watched</button>
                    <a href="https://www.imdb.com/title/${movie.imdbID || movie.IMDB_ID}/" class="btn" target="_blank" rel="noopener noreferrer">IMDB</a>
                </div>
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
        if (searchMovie.value.length < 3) {
            movieCards.innerHTML = '<h3 class="text-center">Type at least 3 characters to search for a movie!</h3>'
            return
        }
        searchMovies(searchMovie.value);
    }, delay);
});

// AirTableDB.showMovies('')

export { renderMovies }
