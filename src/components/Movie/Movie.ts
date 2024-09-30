import axios from 'axios';

import { MovieDetails } from './Movie.interface';
import { DatabaseRecord } from '../../types/DatabaseRecord.interface';
import { modal, showModal } from '../Modal/Modal';
import { Pagination } from '../Pagination/Pagination';
import { loader, AirTableDB } from '../_variables';
import { removeClassFrom, addClassTo } from '../_utils';
import {
  searchMoviesMarkup,
  showMoviesMarkup,
  detailsMovieMarkup,
} from './_movie_markup';
import { offset } from '../utilities/LoadMore';

import './Movie.scss';

const searchMovie = document.getElementById('search-movie') as HTMLInputElement;
const delay = 1500;
const movieCards = document.querySelector('#movie-cards') as HTMLDivElement;
const OMDB_KEY = import.meta.env.VITE_OMDB_KEY;
const airTableRecord = import.meta.env.VITE_AIRTABLE_RECORD;
const moviesButton = document.getElementById('btn-movies') as HTMLDivElement;
const topMoviesText =
  'Want to have a look at my <span class="text-secondary cursor-pointer" data-top-movies="Top">top watched movies!</span>';
const moviesCardHeading = document.getElementById(
  'movies-card-heading'
) as HTMLHeadingElement;
const BASE_URL = `https://www.omdbapi.com/?apikey=${OMDB_KEY}`;
const pagination = new Pagination();
let movieName = '';
let totalPaginationPages: number;
let typingTimer: ReturnType<typeof setTimeout>;

function clearMoviesCards() {
  movieCards.innerHTML = '';
}

function noMoviesFound(condition: boolean, message: string) {
  if (condition) {
    renderMoviesCardHeading(`${message} ${topMoviesText}`);
    clearMoviesCards();
    addClassTo(loader);
    pagination.clear();
    return true;
  }
}

async function getSearchMoviesResults(num: number) {
  const response = await axios.get(`${BASE_URL}&s=${movieName}&page=${num}`);
  totalPaginationPages = response.data.totalResults;
  return response.data.Search;
}

async function searchMovies() {
  const movies = await getSearchMoviesResults(1);
  const message = `<span class="text-primary">${movieName}</span> not found.`;
  if (noMoviesFound(!movies, message)) return;
  renderMovies(movies, searchMoviesMarkup);
  pagination.show(1, totalPaginationPages);
}

function renderMovies(
  movies: DatabaseRecord[],
  markup: Function,
  shouldClear: boolean = true
) {
  // Clear the container when fetching movies from a different table.
  // Do not clear the container when loading more movies from the same table.
  shouldClear && clearMoviesCards();
  addClassTo(loader);
  movies.forEach((movie: DatabaseRecord, index: number) => {
    movieCards.insertAdjacentHTML('beforeend', markup(movie, index));
  });
}

async function getMovieDetails(movieID: string) {
  return (await axios.get(`${BASE_URL}&i=${movieID}&plot=full`)).data;
}

function renderMovie(movie: MovieDetails) {
  // We have to use movie.imdbID || movie.IMDB_ID because
  // imdbID is the property of OMDB and IMDB_ID is airtable
  modal.innerHTML = '';
  modal.insertAdjacentHTML('beforeend', detailsMovieMarkup(movie));
  showModal(modal);
}

movieCards.addEventListener('click', async (event) => {
  const target = event.target as HTMLElement;
  if (target.classList.contains('btn--movie-details')) {
    const movieID = target.dataset.imdbid;
    movieID && renderMovie(await getMovieDetails(movieID));
    return;
  } else if (target.classList.contains('btn--movie-add')) {
    const movieID = target.dataset.imdbid;
    movieID && addMovie(movieID);
    return;
  }
});

moviesCardHeading.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  const topMovies = target.dataset.topMovies;
  topMovies && showMovies(topMovies);
});

function createCountryButtons() {
  const countries = airTableRecord.getCountries();
  for (const country of countries) {
    moviesButton.insertAdjacentHTML(
      'beforeend',
      `<button class="btn" data-country="${country}">${country}</button>`
    );
  }
}

pagination.container.addEventListener('click', async (event) => {
  const target = event.target as HTMLElement;
  if (target.tagName === 'BUTTON') {
    const currPage = Number(target.dataset.pagination);
    removeClassFrom(loader);
    pagination.show(currPage, totalPaginationPages);
    const movies = await getSearchMoviesResults(currPage);
    renderMovies(movies, searchMoviesMarkup);
    addClassTo(loader);
  }
});

moviesButton.addEventListener('click', async (event) => {
  const target = event.target as HTMLElement;
  if (target.classList.contains('btn')) {
    const country = target.dataset.country;
    country && showMovies(country);
    return;
  }
});

const loadMovies = document.getElementById('load-movies') as HTMLButtonElement;
loadMovies.addEventListener('click', () => {
  const tableName = moviesCardHeading.textContent;
  tableName && showMovies(tableName);
});

async function showMovies(country: string) {
  removeClassFrom(loader);
  const [movies, newOffset] = await AirTableDB.getRecords(
    country,
    offset[country],
    12,
    AirTableDB.mpKey,
    AirTableDB.mpBase
  );
  let shouldClear = true;
  if (offset[country]) shouldClear = false;
  offset[country] = newOffset;
  const message = 'There is an error and we could not retrieve the movies.';
  if (noMoviesFound(movies.length == 0, message)) return;
  renderMovies(movies, showMoviesMarkup, shouldClear);
  renderMoviesCardHeading(`${country}`);
  removeClassFrom(moviesButton);
  addClassTo(loader);
  removeClassFrom(loadMovies);
  !offset[country] && addClassTo(loadMovies);
}

function renderMoviesCardHeading(message: string) {
  moviesCardHeading.innerHTML = message;
}

async function addMovie(movieID: string) {
  removeClassFrom(loader);
  const movieDetails = await getMovieDetails(movieID);
  const country: string = movieDetails.Country.split(',').shift()?.trim();
  const countries = airTableRecord.getCountries();
  if (countries.includes(country)) {
    AirTableDB.addRecord(country, movieDetails);
  } else {
    AirTableDB.addRecord(airTableRecord, movieDetails);
  }
}

searchMovie.addEventListener('input', () => {
  clearTimeout(typingTimer); // Clear the previous timer
  // Start a new timer that code will execute after the specified delay
  typingTimer = setTimeout(() => {
    addClassTo(moviesButton);
    const searchValue = searchMovie.value;
    const message = 'Type at least 3 characters to search for a movie.';
    if (noMoviesFound(searchValue.length < 3, message)) return;
    removeClassFrom(loader);
    movieName = searchValue;
    searchMovies();
    renderMoviesCardHeading('Search Results');
  }, delay);
});

function init() {
  showMovies('Top');
  createCountryButtons();
}

init();
