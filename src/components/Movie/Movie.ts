import axios from "axios";

import { MovieDetails } from "./Movie.interface";
import { DatabaseRecord } from "../../types/DatabaseRecord.interface";
import { modal, showModal } from "../Modal/Modal";
import { AirTable } from '../Airtable/Airtable';
import { loader } from '../_variables';
import { removeClassFrom, addClassTo } from '../_utils';
import {
  searchMoviesMarkup,
  showMoviesMarkup,
  detailsMovieMarkup,
} from "./_movie_markup";

import "./Movie.scss";

const searchMovie = document.getElementById("search-movie") as HTMLInputElement;
const delay = 1500;
const movieCards = document.querySelector("#movie-cards") as HTMLButtonElement;
const API_KEY = import.meta.env.VITE_API_KEY;
const airTableRecord = import.meta.env.VITE_AIRTABLE_RECORD;
const AirTableDB = new AirTable();
const moviesButton = document.getElementById("btn-movies") as HTMLDivElement;

let typingTimer: ReturnType<typeof setTimeout>;

async function searchMovies(movieName: string) {
  const response = await axios.get(
    `https://www.omdbapi.com/?s=${movieName}&apikey=${API_KEY}&plot=full&y=`
  );
  renderMovies(response.data.Search, movieName);
}

function renderMovies(movies: DatabaseRecord[], movieName: string = "") {
  if (!movies) {
    movieCards.innerHTML = `<h3 class="text-center">No movies found with <span class="text-primary">${movieName}</span> name. Have a look at my top <span class="text-secondary cursor-pointer" data-top="watched-movies">watched movies</span></h3>`;
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
    country && AirTableDB.showMovies(country);
    return;
  }
});

async function addMovie(movieID: string) {
  removeClassFrom(loader);
  const movieDetails = await getMovieDetails(movieID);
  const country: string = movieDetails.Country.split(",").shift()?.trim();
  const countries = await AirTableDB.getCountryList();
  if (countries.includes(country)) {
    AirTableDB.addMovie(country, movieDetails);
  } else {
    AirTableDB.addMovie(airTableRecord, movieDetails);
  }
}

function checkInputLength(length: number) {
  if (length >= 3) {
    return false;
  }
  movieCards.innerHTML =
    '<h3 class="text-center mx-auto custom-line-height">Type at least 3 characters to search for a movie or have a look at my top <span class="text-secondary cursor-pointer" data-movies="top-watched">watched movies</span></h3>';
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

export { renderMovies };
