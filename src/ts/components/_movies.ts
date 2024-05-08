import axios from 'axios';
import { Movies } from '../interfaces/_movies_interfaces';

const movieCards = document.querySelector('#movie-cards') as HTMLButtonElement
const movieGen = document.querySelector('#movie-gen') as HTMLButtonElement
const API_KEY = import.meta.env.VITE_API_KEY;

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

movieGen.addEventListener('click', () => {
    searchMovies('')
})
