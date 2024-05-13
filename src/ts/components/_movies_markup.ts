import { Movie } from "../interfaces/_movies_interfaces"

function searchMoviesMarkup(movie:Movie, index:number) {
    return`
    <div class="movie-card" id=${index}>
        <div><img class="poster" src="${movie.Poster}" alt="Movie Poster"></div>
        <div class="movie-card__body">
            <h2 class="movie-card__title">${movie.Title}<span class="title-text"> (${movie.Year})</span></h2>
            <p class="movie-text my-xs">Type: ${movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1)}</p>
            <div class="btn-group">
                <button class="btn btn--movie-details" data-imdbid=${movie.imdbID || movie.IMDB_ID}>Details</button>
                <button class="btn btn--movie-add" data-imdbid=${movie.imdbID || movie.IMDB_ID}>Watch List</button>
                <a href="https://www.imdb.com/title/${movie.imdbID || movie.IMDB_ID}/" class="btn" target="_blank" rel="noopener noreferrer">IMDB</a>
            </div>
        </div>
    </div>`
}

function showMoviesMarkup(movie:Movie, index:number) {
    return `
    <div class="movie-card" id=${index}>
        <div><img class="poster" src="${movie.Poster}" alt="Movie Poster"></div>
        <div class="movie-card__body">
            <h2 class="movie-card__title">${movie.Title}<span class="title-text"> (${movie.Year})</span></h2>
            <p class="movie-text my-xs"><span class="point-name">Type:</span> ${movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1)} - ${movie.Runtime}</p>
            <p class="movie-text mb-s"><span class="point-name">Plot:</span> ${movie.Plot}</p>
            <p><span class="point-name">Genre:</span> ${movie.Genre}</p>
            <p class="my-xs"><span class="point-name">IMDB:</span> ${movie.IMDBRatings} | <span class="point-name">Rotten:</span> ${movie.RottenRatings}</p>
            <p><span class="point-name">Country:</span> ${movie.Country}</p>
            <p class="my-xs"><span class="point-name">Language:</span> ${movie.Language}</p>
            <p><span class="point-name">Box Office:</span> ${movie.BoxOffice}</p>
            <a href="https://www.imdb.com/title/${movie.imdbID || movie.IMDB_ID}/" class="btn my-xs" target="_blank" rel="noopener noreferrer">Visit IMDB</a>
        </div>
    </div>`
}

export { searchMoviesMarkup, showMoviesMarkup }
