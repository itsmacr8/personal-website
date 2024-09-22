import Airtable, { Base } from 'airtable';
import { DatabaseRecord } from '../../types/DatabaseRecord.interface';
import { sortFieldsByNumericOrder, sortedArray } from '../_utils';

class AirTable {
  private pwKey: string = import.meta.env.VITE_PWK;
  private pwBase: string = import.meta.env.VITE_PWB;
  public mpKey: string = import.meta.env.VITE_MPK;
  public mpBase: string = import.meta.env.VITE_MPB;
  public base: Base = this.getBase(this.mpKey, this.mpBase);

  getBase(apiKey: string, apiBase: string): Base {
    return new Airtable({ apiKey: apiKey }).base(apiBase);
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

  async getRecord(
    tableName: string,
    recordId: string,
    apiKey: string = this.pwKey,
    baseId: string = this.pwBase
  ) {
    try {
      const url = `https://api.airtable.com/v0/${baseId}/${tableName}/${recordId}`;
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
}

export { AirTable };
