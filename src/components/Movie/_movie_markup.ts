import { MovieDetails } from "./Movie.interface";
import { DatabaseRecord } from "../../types/DatabaseRecord.interface";
import { capitalize } from "../_utils";

function moviesMarkup(
  movie: DatabaseRecord,
  index: number,
  isSearch: boolean = true
) {
  const detailBtnClass = 'class="btn btn--movie-details"';
  const addBtnClass = 'class="btn btn--movie-add"';
  const base = 'https://www.imdb.com/title';
  const capitalized = typeof movie.Type === 'string' && capitalize(movie.Type);
  const imdbID = movie.imdbID || movie.IMDB_ID;
  const type = isSearch
    ? `Type: ${capitalized}`
    : `${capitalized} - ${movie.Runtime} | Ratings: ${movie.IMDBRatings}`;
  const recBtn = isSearch
    ? `<button ${addBtnClass} data-imdbid=${imdbID}>Recommend</button>`
    : '';
  return `
    <div class="card" id=${index}>
      <div>
        <img class="card__thumbnail poster" src="${movie.Poster}"
        alt="${movie.Title} (${movie.Year}) ${capitalized} Poster"
        title="${movie.Title} (${movie.Year}) ${capitalized} Poster">
      </div>
      <div class="card__body">
        <h4>${movie.Title} (${movie.Year})</h4>
        <p class="mb-xs">${type}</p>
        <div class="btn-group">
          <button ${detailBtnClass} data-imdbid=${imdbID}>Details</button>
          ${recBtn}
          <a href="${base}/${imdbID}/" class="btn" target="_blank"
          rel="noopener noreferrer">Visit IMDB</a>
        </div>
      </div>
    </div>`;
}

function searchMoviesMarkup(movie: DatabaseRecord, index: number) {
  return moviesMarkup(movie, index);
}

function showMoviesMarkup(movie: DatabaseRecord, index: number) {
  return moviesMarkup(movie, index, false);
}

function detailsMovieMarkup(movie: MovieDetails) {
  const capitalized = capitalize(movie.Type)
  return `
    <div class="modal__content">
      <button class="modal__close">&times;</button>
      <div class="modal__primary-details">
        <div>
          <img class="card__thumbnail poster" src="${movie.Poster}"
          alt="${movie.Title} (${movie.Year}) ${capitalized} Poster"
          title="${movie.Title} (${movie.Year}) ${capitalized} Poster">
        </div>
        <h2 class="mt-s">${movie.Title} (${movie.Year})</h2>
        <p>${capitalized} - ${movie.Runtime}</p>
      </div>
      <div class="modal__secondary-details">
          <p class="mb-s">${movie.Plot}</p>
          <p>Genre: ${movie.Genre}</p>
          <p>IMDB: ${movie.Ratings[0]?.Value || 'N/A'} |
          Rotten: ${movie.Ratings[1]?.Value || 'N/A'}</p>
          <p>Country: ${movie.Country}</p>
          <p>Language: ${movie.Language}</p>
          <p>Box Office: ${movie.BoxOffice}</p>
      </div>
    </div>`;
}

function movieSaveMessage(message: string, isErr: boolean) {
  return `
    <div class="modal__content movie-db ${isErr && 'movie-db--error'}">
      <p>${message}</p>
      <button class="modal__close" aria-label="Close">&times;</button>
    </div>`;
}

export {
  searchMoviesMarkup,
  showMoviesMarkup,
  detailsMovieMarkup,
  movieSaveMessage,
};
