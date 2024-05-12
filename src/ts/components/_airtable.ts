import Airtable, { Base } from "airtable";
import { Movie, MovieDetails } from "../interfaces/_movies_interfaces";
import { renderMovies } from "./_movies";


class AirTable {
  private api_key: string = import.meta.env.VITE_AIRTABLE_KEY;
  private api_base: string = import.meta.env.VITE_AIRTABLE_BASE;
  private base: Base = new Airtable({ apiKey: this.api_key }).base(this.api_base);

  async getMoviesList(tableName:string) {
    // Table name to show data from the table
    const movies:Movie[] = [];
    try {
      await this.base(tableName).select({
        maxRecords: 3,
        view: "Grid view"
      }).eachPage((records, fetchNextPage) => {
        records.forEach(function(record) {
          movies.push(record.fields);
        });
        fetchNextPage();
      });
      return movies;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async showMovies(tableName:string) {
    // Table name to show data from the table
    try {
        const moviesList = await this.getMoviesList(tableName);
        renderMovies(moviesList);
    } catch (error) {
        console.error(error);
    }
  }

  addMovie(tableName: string, movie: MovieDetails) {
    // It capitalize the first letter, eg. movie to Movie
    const type = movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1)
    this.base(tableName).create([
      {
        "fields": {
        "IMDB_ID": movie.imdbID,
        "Poster": movie.Poster,
        "Title": movie.Title,
        "Year": Number(movie.Year),
        "Genre": movie.Genre,
        "Type": type,
        "Runtime": movie.Runtime,
        "Plot": movie.Plot,
        "IMDBRatings": movie.Ratings[0]?.Value || 'N/A',
        "RottenRatings": movie.Ratings[1]?.Value || 'N/A',
        "Country": movie.Country,
        "Language": movie.Language,
        "BoxOffice": movie.BoxOffice,
        }
      },],
    function(err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records?.forEach(function (record) {
        console.log(record.getId());
      });
    });
  }
}

export { AirTable }
