import { Base } from "airtable";
import { getDatabaseRecords } from "../../components/_utils";
import { MovieDetails } from "../../components/Movie/Movie.interface";
import { renderMovies } from "../../components/Movie/Movie";
import { capitalize, getAirTableBase } from "../_utils";
import { hideLoader } from "../../components/Loader/Loader";
import { modal, showModal, autoCloseModal } from "../../components/Modal/Modal";
import {
  movieDBSaveMarkup,
  movieDBErrorMarkup,
} from "../../components/Movie/_movie_markup";

class AirTable {
  private api_key: string = import.meta.env.VITE_AIRTABLE_KEY;
  private api_base: string = import.meta.env.VITE_AIRTABLE_BASE;
  private base: Base = getAirTableBase(this.api_key, this.api_base);
  private airTableName: string = import.meta.env.VITE_AIRTABLE_TABLE_NAME;

  async showMovies(tableName: string, maxRecords :number = 3) {
    // Table name to show data from the table
    try {
      const moviesList = await getDatabaseRecords(tableName, maxRecords, this.api_key, this.api_base);
      renderMovies(moviesList);
    } catch (error) {
      console.error(error);
    }
  }

  addMovie(tableName: string, movie: MovieDetails) {
    this.base(tableName).create(
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
            IMDBRatings: movie.Ratings[0]?.Value || "N/A",
            RottenRatings: movie.Ratings[1]?.Value || "N/A",
            Country: movie.Country,
            Language: movie.Language,
            BoxOffice: movie.BoxOffice,
          },
        },
      ],
      (err, records) => {
        if (err) {
          this.cleanAndShowModal(movieDBErrorMarkup, movie.Title, err.message);
          return;
        }
        records?.forEach(() => {
          this.cleanAndShowModal(movieDBSaveMarkup, movie.Title, movie.Country);
          autoCloseModal(modal);
        });
      }
    );
  }

  cleanAndShowModal(
    movieDBMarkup: Function,
    name: string,
    countryOrErr: string
  ) {
    modal.innerHTML = "";
    modal.insertAdjacentHTML("beforeend", movieDBMarkup(name, countryOrErr));
    modal.classList.add("modal--db-mess");
    hideLoader();
    showModal(modal);
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
