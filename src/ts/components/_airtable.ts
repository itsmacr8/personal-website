import Airtable, { Base } from "airtable";
import { Movie } from "../interfaces/_movies_interfaces";
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
}

export { AirTable }
