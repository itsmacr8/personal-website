import axios from "axios";

import { MovieDetails } from "./Movie.interface";
import { DatabaseRecord } from "../../types/DatabaseRecord.interface";
import { modal, showModal, autoCloseModal } from "../Modal/Modal";
import { loader, AirTableDB } from '../_variables';
import { removeClassFrom, addClassTo, capitalize } from '../_utils';
import {
  searchMoviesMarkup,
  showMoviesMarkup,
  detailsMovieMarkup,
  movieDBErrorMarkup,
  movieDBSaveMarkup
} from "./_movie_markup";

import "./Movie.scss";

const searchMovie = document.getElementById("search-movie") as HTMLInputElement;
const delay = 1500;
const movieCards = document.querySelector("#movie-cards") as HTMLButtonElement;
const API_KEY = import.meta.env.VITE_API_KEY;
const airTableRecord = import.meta.env.VITE_AIRTABLE_RECORD;
const moviesButton = document.getElementById("btn-movies") as HTMLDivElement;
const topMoviesText = 'Want to have a look at my top <span class="text-secondary cursor-pointer" data-top-movies="Top List">watched movies!</span>'

let typingTimer: ReturnType<typeof setTimeout>;

async function searchMovies(movieName: string) {
  const response = await axios.get(
    `https://www.omdbapi.com/?s=${movieName}&apikey=${API_KEY}&plot=full&y=`
  );
  renderMovies(response.data.Search, movieName);
}

function renderMovies(movies: DatabaseRecord[], movieName: string = "") {
  if (!movies) {
    movieCards.innerHTML = `<h3 class="text-center">No movies found with <span class="text-primary">${movieName}</span> name. ${topMoviesText}</h3>`;
    addClassTo(loader);
    return;
  }
  movieCards.innerHTML = "";
  addClassTo(loader);
  movies.forEach((movie: DatabaseRecord, index: number) => {
    movieName &&
      movieCards.insertAdjacentHTML(
        "beforeend",
        searchMoviesMarkup(movie, index)
      );
    !movieName &&
      movieCards.insertAdjacentHTML(
        "beforeend",
        showMoviesMarkup(movie, index)
      );
  });
}

async function getMovieDetails(movieName: string) {
  const response = await axios.get(
    `https://www.omdbapi.com/?i=${movieName}&apikey=${API_KEY}&plot=full&y=`
  );
  return response.data;
}

function renderMovie(movie: MovieDetails) {
  // We have to use movie.imdbID || movie.IMDB_ID because
  // imdbID is the property of OMDB and IMDB_ID is airtable
  modal.innerHTML = "";
  modal.insertAdjacentHTML("beforeend", detailsMovieMarkup(movie));
  showModal(modal);
}

movieCards.addEventListener("click", async (event) => {
  const target = event.target as HTMLElement;
  if (target.classList.contains("btn--movie-details")) {
    const movieID = target.dataset.imdbid;
    movieID && renderMovie(await getMovieDetails(movieID));
    return;
  } else if (target.classList.contains("btn--movie-add")) {
    const movieID = target.dataset.imdbid;
    movieID && addMovie(movieID);
    return;
  } else if (target.dataset.topMovies) {
    showMovies(target.dataset.topMovies);
  }
});

async function createCountryButtons() {
  const countries = await AirTableDB.getCountryList();
  for (const country of countries) {
    moviesButton.insertAdjacentHTML(
      "beforeend",
      `<button class="btn" data-country="${country}">${country} Movies</button>`
    );
  }
}

// createCountryButtons();

moviesButton.addEventListener("click", async (event) => {
  const target = event.target as HTMLElement;
  if (target.classList.contains("btn")) {
    const country = target.dataset.country;
    country && showMovies(country);
    return;
  }
});

async function showMovies(country: string) {
  removeClassFrom(loader);
  const movies = await AirTableDB.getRecords(country, 3, AirTableDB.base);
  movies && renderMovies(movies);
  renderMoviesHeading(country);
  addClassTo(loader);
}

function renderMoviesHeading(country: string) {
  const moviesListHeading = document.getElementById('movies-list-heading') as HTMLHeadingElement;
  if (moviesListHeading) {
    moviesListHeading.innerHTML = `${country} movies`
  } else {
    movieCards.insertAdjacentHTML(
      "beforebegin",
      `<h3 id="movies-list-heading" class="text-center mb-2">${country} movies</h3>`
    );
  }
}

async function addMovie(movieID: string) {
  removeClassFrom(loader);
  const movieDetails = await getMovieDetails(movieID);
  const country: string = movieDetails.Country.split(",").shift()?.trim();
  const countries = await AirTableDB.getCountryList();
  if (countries.includes(country)) {
    saveMovieData(country, movieDetails);
  } else {
    saveMovieData(airTableRecord, movieDetails);
  }
}

function checkInputLength(length: number) {
  if (length >= 3) {
    return false;
  }
  movieCards.innerHTML =
    `<h3 class="text-center mx-auto custom-line-height">Type at least 3 characters to search for a movie. ${topMoviesText}</h3>`;
  return true;
}

searchMovie.addEventListener("input", () => {
  clearTimeout(typingTimer); // Clear the previous timer
  // Start a new timer that code will execute after the specified delay
  typingTimer = setTimeout(() => {
    if (checkInputLength(searchMovie.value.length)) return;
    removeClassFrom(loader);
    addClassTo(moviesButton);
    searchMovies(searchMovie.value);
  }, delay);
});

function saveMovieData(tableName: string, movie: MovieDetails) {
  const base = AirTableDB.base;
  base(tableName).create(
    [
      {
        fields: {
          IMDB_ID: movie.imdbID,
          Poster: movie.Poster,
          Title: movie.Title,
          Year: Number(movie.Year),
          Genre: movie.Genre,
          Type: capitalize(movie.Type),
          Runtime: movie.Runtime,
          Plot: movie.Plot,
          IMDBRatings: movie.Ratings[0]?.Value || 'N/A',
          RottenRatings: movie.Ratings[1]?.Value || 'N/A',
          Country: movie.Country,
          Language: movie.Language,
          BoxOffice: movie.BoxOffice,
        },
      },
    ],
    (err, records) => {
      if (err) {
        cleanAndShowModal(movieDBErrorMarkup, movie.Title, err.message);
        return;
      }
      records?.forEach(() => {
        cleanAndShowModal(movieDBSaveMarkup, movie.Title, movie.Country);
        autoCloseModal(modal);
      });
    }
  );
}

function cleanAndShowModal(
  movieDBMarkup: Function,
  name: string,
  countryOrErr: string
) {
  modal.innerHTML = '';
  modal.insertAdjacentHTML('beforeend', movieDBMarkup(name, countryOrErr));
  addClassTo(modal, 'modal--db-mess');
  addClassTo(loader);
  showModal(modal);
}

function init() {
  showMovies('Top List');
}

init()
