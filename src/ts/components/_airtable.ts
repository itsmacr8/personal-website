import Airtable, { Base } from "airtable";
import { Movie, MovieDetails } from "../interfaces/_movies_interfaces";
import { renderMovies } from "./_movies";
import { capitalize } from "../_utils";
import { modal, showModal, autoCloseModal } from "../../components/_modal";
import { movieDBSaveMarkup, movieDBErrorMarkup } from "./_movies_markup";
import { loader } from "../../components/Loader/Loader";


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
    (err, records) => {
      if (err) {
        this.cleanAndShowModal(movieDBErrorMarkup, movie.Title, err.message)
        return;
      }
      records?.forEach( () => {
        this.cleanAndShowModal(movieDBSaveMarkup, movie.Title, movie.Country)
        autoCloseModal(modal)
      });
    });
  }

  cleanAndShowModal(movieDBMarkup: Function, name: string, countryOrErr: string) {
    modal.innerHTML = '';
    modal.insertAdjacentHTML('beforeend', movieDBMarkup(name, countryOrErr))
    loader.classList.add('loader-container--hide')
    showModal(modal)
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
