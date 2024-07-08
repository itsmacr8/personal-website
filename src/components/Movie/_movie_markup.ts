import { MovieDetails } from "./Movie.interface";
import { DatabaseRecord } from "../../types/DatabaseRecord.interface";
import { capitalize } from "../_utils";

function searchMoviesMarkup(movie: DatabaseRecord, index: number) {
  const capitalized = typeof movie.Type === 'string' && capitalize(movie.Type);
  return `
    <div class="movie-card" id=${index}>
      <div>
        <img class="poster" src="${movie.Poster}"
        alt="${movie.Title} (${movie.Year}) ${capitalized} Poster"
        title="${movie.Title} (${movie.Year}) ${capitalized} Poster">
      </div>
      <div class="movie-card__body">
        <h2 class="movie-card__title">${movie.Title}
        <span class="title-text"> (${movie.Year})</span></h2>
        <p class="movie-text my-xs">
          <span class="point-name">Type:</span> ${capitalized}
        </p>
        <div class="btn-group">
            <button class="btn btn--movie-details" data-imdbid=${
              movie.imdbID || movie.IMDB_ID
            }>Details</button>
            <button class="btn btn--movie-add" data-imdbid=${
              movie.imdbID || movie.IMDB_ID
            }>Watch List</button>
            <a href="https://www.imdb.com/title/${
              movie.imdbID || movie.IMDB_ID
            }/" class="btn" target="_blank" rel="noopener noreferrer">IMDB</a>
        </div>
      </div>
    </div>`;
}

function showMoviesMarkup(movie: DatabaseRecord, index: number) {
  const capitalized = typeof movie.Type === 'string' && capitalize(movie.Type);
  return `
    <div class="movie-card" id=${index}>
      <div>
        <img class="poster" src="${movie.Poster}"
        alt="${movie.Title} (${movie.Year}) ${capitalized} Poster"
        title="${movie.Title} (${movie.Year}) ${capitalized} Poster">
      </div>
      <div class="movie-card__body">
          <h2 class="movie-card__title">${
            movie.Title
          }<span class="title-text"> (${movie.Year})</span></h2>
          <p class="movie-text my-xs"><span class="point-name">Type:</span> ${capitalized} - ${
    movie.Runtime
  }</p>
          <p class="movie-text mb-s"><span class="point-name">Plot:</span> ${
            movie.Plot
          }</p>
          <p><span class="point-name">Genre:</span> ${movie.Genre}</p>
          <p class="my-xs"><span class="point-name">IMDB:</span> ${
            movie.IMDBRatings
          } | <span class="point-name">Rotten:</span> ${movie.RottenRatings}</p>
          <p><span class="point-name">Country:</span> ${movie.Country}</p>
          <p class="my-xs"><span class="point-name">Language:</span> ${
            movie.Language
          }</p>
          <p><span class="point-name">Box Office:</span> ${movie.BoxOffice}</p>
          <a href="https://www.imdb.com/title/${
            movie.imdbID || movie.IMDB_ID
          }/" class="btn my-xs" target="_blank" rel="noopener noreferrer">Visit IMDB</a>
      </div>
    </div>`;
}

function detailsMovieMarkup(movie: MovieDetails) {
  const capitalized = capitalize(movie.Type)
  return `
    <div class="modal__content">
      <button class="modal__close">&times;</button>
      <div class="modal__primary-details">
        <div>
          <img class="poster" src="${movie.Poster}"
          alt="${movie.Title} (${movie.Year}) ${capitalized} Poster"
          title="${movie.Title} (${movie.Year}) ${capitalized} Poster">
        </div>
        <h2 class="mt-s">${movie.Title} (${movie.Year})</h2>
        <p>${capitalized} - ${movie.Runtime}</p>
      </div>
      <div class="modal__secondary-details">
          <p class="movie-text mb-s">${movie.Plot}</p>
          <p>Genre: ${movie.Genre}</p>
          <p class="my-xs">IMDB: ${
            movie.Ratings[0]?.Value || "N/A"
          } | Rotten: ${movie.Ratings[1]?.Value || "N/A"}</p>
          <p>Country: ${movie.Country}</p>
          <p class="my-xs">Language: ${movie.Language}</p>
          <p>Box Office: ${movie.BoxOffice}</p>
      </div>
    </div>`;
}

function movieDBSaveMarkup(movieName: string, countryName: string) {
  return `
    <div class="modal__content movie-db movie-db--saved">
        <p><strong>${movieName}</strong> saved to the <strong>${countryName}</strong> movies database successfully!</p>
        <button class="modal__close" aria-label="Close">&times;</button>
    </div>`;
}

function movieDBErrorMarkup(movieName: string, errMess: string) {
  return `
    <div class="modal__content movie-db movie-db--error">
        <p>Error! Could not save <strong>${movieName}</strong> to the database. ${errMess}.</p>
        <button class="modal__close" aria-label="Close">&times;</button>
    </div>`;
}

export {
  searchMoviesMarkup,
  showMoviesMarkup,
  detailsMovieMarkup,
  movieDBSaveMarkup,
  movieDBErrorMarkup,
};
