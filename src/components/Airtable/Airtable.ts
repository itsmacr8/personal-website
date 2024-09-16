import Airtable, { Base } from 'airtable';
import { DatabaseRecord } from '../../types/DatabaseRecord.interface';

class AirTable {
  private pwKey: string = import.meta.env.VITE_PWK;
  private pwBase: string = import.meta.env.VITE_PWB;
  public mpKey: string = import.meta.env.VITE_MPK;
  public mpBase: string = import.meta.env.VITE_MPB;
  public base: Base = this.getBase(this.mpKey, this.mpBase);
  private pwBaseFun: Base = this.getBase(this.pwKey, this.pwBase);
  private airTableName: string = import.meta.env.VITE_TABLE_NAME;

  getBase(apiKey: string, apiBase: string): Base {
    return new Airtable({ apiKey: apiKey }).base(apiBase);
  }

  async getRecord(
    tableName: string,
    recordID: string,
    base: Base = this.pwBaseFun
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
    offset: string = '',
    maxRecords: number = 3,
    apiKey: string = this.pwKey,
    baseId: string = this.pwBase
  ) {
    try {
      let url = `https://api.airtable.com/v0/${baseId}/${tableName}?pageSize=${maxRecords}&view=Grid%20view`;
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
