import axios from 'axios';
import { MovieDetails } from '../Movie/Movie.interface';
import { movieSaveMessage } from '../Movie/_movie_markup';
import { DatabaseRecord } from '../../types/DatabaseRecord.interface';
import {
  sortFieldsByNumericOrder,
  sortedArray,
  addClassTo,
  capitalize,
} from '../_utils';
import { modal, showModal, autoCloseModal } from '../Modal/Modal';
import { loader, countriesTable, countriesRecordID } from '../_variables';

class AirTable {
  private url: string = 'https://api.airtable.com/v0';
  private pwKey: string = import.meta.env.VITE_PWK;
  private pwBase: string = import.meta.env.VITE_PWB;
  public mpKey: string = import.meta.env.VITE_MPK;
  public mpBase: string = import.meta.env.VITE_MPB;

  async getRecords(
    tableName: string,
    offset: string = '',
    maxRecords: number = 3,
    apiKey: string = this.pwKey,
    baseId: string = this.pwBase
  ) {
    const filter = `pageSize=${maxRecords}&view=Grid%20view`;
    try {
      let url = `${this.url}/${baseId}/${tableName}?${filter}`;
      if (offset) url += `&offset=${offset}`;

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      const data = await response.json();
      offset = data.offset; // Save the offset for the next fetch

      const records: DatabaseRecord[] = [];
      data.records.forEach((record: any) => {
        records.push(record.fields);
      });
      return [records, offset] as [DatabaseRecord[], string]; // Type assertion
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getRecord(
    tableName: string,
    recordId: string,
    apiKey: string = this.pwKey,
    baseId: string = this.pwBase
  ) {
    try {
      const url = `${this.url}/${baseId}/${tableName}/${recordId}`;
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      const data = await response.json();
      const record = data.fields;
      return sortedArray(sortFieldsByNumericOrder(record), record);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async addRecord(tableName: string, movie: MovieDetails) {
    const url = `${this.url}/${this.mpBase}/${tableName}`;
    try {
      await axios.post(
        url,
        {
          fields: {
            IMDB_ID: movie.imdbID,
            Poster: movie.Poster,
            Title: movie.Title,
            Year: movie.Year,
            Genre: movie.Genre,
            Type: capitalize(movie.Type),
            Runtime: movie.Runtime,
            Plot: movie.Plot,
            IMDBRatings: movie.Ratings[0]?.Value || 'N/A',
            RottenRatings: movie.Ratings[1]?.Value || 'N/A',
            Country: movie.Country,
            Language: movie.Language,
            BoxOffice: movie.BoxOffice,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${this.mpKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      this.cleanAndShowModal(
        `Thank you for your recommendation! <strong>${movie.Title}</strong> \n
        saved to the database successfully!`,
        false
      );
      autoCloseModal(modal);
    } catch (error) {
      this.cleanAndShowModal(
        `Error! <strong>${movie.Title}</strong> could not save to the database.`,
        true
      );
      return;
    }
  }

  private cleanAndShowModal(message: string, isErr: boolean) {
    modal.innerHTML = '';
    modal.insertAdjacentHTML('beforeend', movieSaveMessage(message, isErr));
    addClassTo(modal, 'modal--db-mess');
    addClassTo(loader);
    showModal(modal);
  }

  async getCountries() {
    return await this.getRecord(
      countriesTable,
      countriesRecordID,
      this.mpKey,
      this.mpBase
    );
  }
}

export { AirTable };
