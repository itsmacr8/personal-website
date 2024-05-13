import Airtable, { Base } from "airtable";
import { Movie, MovieDetails } from "../interfaces/_movies_interfaces";
import { renderMovies } from "./_movies";
import { capitalize } from "../_utils";


class AirTable {
  private api_key: string = import.meta.env.VITE_AIRTABLE_KEY;
  private api_base: string = import.meta.env.VITE_AIRTABLE_BASE;
  private base: Base = new Airtable({ apiKey: this.api_key }).base(this.api_base);
  private airTableName: string = import.meta.env.VITE_AIRTABLE_TABLE_NAME;

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
    this.base(tableName).create([
      {
        "fields": {
        "IMDB_ID": movie.imdbID,
        "Poster": movie.Poster,
        "Title": movie.Title,
        "Year": Number(movie.Year),
        "Genre": movie.Genre,
        "Type": capitalize(movie.Type),
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

  async getCountryList() {
    const countries: any[] = [];
    try {
      const records = await this.base(this.airTableName).select().firstPage();
      records?.forEach((record) => {
        countries.push(record.get(this.airTableName));
      });
      return countries;
    } catch (err) {
      console.error(err);
      return [];
    }
  }
}

export { AirTable }
