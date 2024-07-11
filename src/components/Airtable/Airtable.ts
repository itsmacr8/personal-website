import Airtable, { Base } from "airtable";

import { pw_key, pw_base } from "../_variables";
import { DatabaseRecord } from "../../types/DatabaseRecord.interface";

class AirTable {
  private api_key: string = import.meta.env.VITE_AIRTABLE_KEY;
  private api_base: string = import.meta.env.VITE_AIRTABLE_BASE;
  public base: Base = this.getBase(this.api_key, this.api_base);
  private PW_BASE: Base = this.getBase(pw_key, pw_base);
  private airTableName: string = import.meta.env.VITE_AIRTABLE_TABLE_NAME;

  getBase(api_key: string, api_base: string): Base {
    return new Airtable({ apiKey: api_key }).base(api_base);
  }

  async getRecord(
    tableName: string,
    recordID: string,
    base: Base = this.PW_BASE,
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
    base: Base = this.PW_BASE
  ) {
    const dbRecords: DatabaseRecord[] = [];
    try {
      const records = await base(tableName)
        .select({
          maxRecords: maxRecords,
          // Returns data in the same order we set in the view
          view: "Grid view",
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
