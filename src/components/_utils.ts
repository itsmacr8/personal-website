import { DatabaseRecordType ,DatabaseRecord } from "../types/DatabaseRecord.interface";
import { getAirTableBase } from "../ts/_utils";
import { pw_key, pw_base } from "./_variables";

function createArray(string:string) {
  // Receive a comma separated string and convert them to an array.
  // For example, 'Hello, World' to ['Hello', 'World']
  return string.split(',').map(skill => skill.trim());
}

function listTags(tags: string[]) {
  let tagsMarkup = ''
  for (const tag of tags) {
    tagsMarkup += `<li class='project__tag'>${tag}</li>`
  }
  return tagsMarkup
}

async function getDatabaseRecord(tableName: string, recordID: string, dbKey: string = pw_key, dbBase:string = pw_base) {
  try {
    const base = getAirTableBase(dbKey, dbBase);
    const record = await base(tableName).find(recordID);
    return record.fields;
  } catch (err) {
    console.error(err);
  }
}

async function renderDatabaseRecord(selector: string, records: DatabaseRecordType[]) {
  const selectElement = document.querySelector(selector) as HTMLDivElement;
  for (const record of records) {
    record && selectElement.insertAdjacentHTML("beforeend", `${record}`);
  }
}

async function getDatabaseRecords(tableName: string, dbKey: string = pw_key, dbBase:string = pw_base) {
  // Table name to show data from the table
  const dbRecords:DatabaseRecord[] = [];
  try {
    const base = getAirTableBase(dbKey, dbBase);
    await base(tableName)
      .select({
        maxRecords: 3,
        // It returns data in ascending order; otherwise random order
        view: "Grid view",
      })
      .eachPage((records, fetchNextPage) => {
        records.forEach(function (record) {
          dbRecords.push(record.fields);
        });
        fetchNextPage();
      });
    return dbRecords;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

function renderDatabaseRecords(
  databaseRecords: DatabaseRecord[],
  container: HTMLDivElement,
  markupFunction: Function
) {
  databaseRecords.forEach((databaseRecord: DatabaseRecord, index: number) => {
    container.insertAdjacentHTML(
      "beforeend",
      markupFunction(databaseRecord, index)
    );
  });
}

export {
  createArray,
  listTags,
  getDatabaseRecord,
  renderDatabaseRecord,
  getDatabaseRecords,
  renderDatabaseRecords,
};
