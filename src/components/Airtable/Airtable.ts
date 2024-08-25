import Airtable, { Base } from "airtable";

import { pwKey, pwBase } from '../_variables';
import { DatabaseRecord } from '../../types/DatabaseRecord.interface';

class AirTable {
  private apiKey: string = import.meta.env.VITE_MPK;
  private apiBase: string = import.meta.env.VITE_MPB;
  public base: Base = this.getBase(this.apiKey, this.apiBase);
  private pwBase: Base = this.getBase(pwKey, pwBase);
  private airTableName: string = import.meta.env.VITE_TABLE_NAME;

  getBase(apiKey: string, apiBase: string): Base {
    return new Airtable({ apiKey: apiKey }).base(apiBase);
  }

  async getRecord(
    tableName: string,
    recordID: string,
    base: Base = this.pwBase
  ) {
    try {
      const record = await base(tableName).find(recordID);
      return record.fields;
    } catch (err) {
      console.error(err);
    }
  }

  async getRecords(
    tableName: string,
    maxRecords: number = 3,
    base: Base = this.pwBase
  ) {
    const dbRecords: DatabaseRecord[] = [];
    try {
      const records = await base(tableName)
        .select({
          maxRecords: maxRecords,
          // Returns data in the same order we set in the view
          view: 'Grid view',
        })
        .firstPage();
      records.forEach((record) => {
        dbRecords.push(record.fields);
      });
      return dbRecords;
    } catch (err) {
      console.error(err);
      throw err;
    }
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

export { AirTable };
