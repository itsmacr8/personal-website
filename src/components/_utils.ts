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

async function getDatabaseRecords(tableName: string, maxRecords: number = 3, dbKey: string = pw_key, dbBase:string = pw_base) {
  // Table name to show data from the table
  const dbRecords:DatabaseRecord[] = [];
  try {
    const base = getAirTableBase(dbKey, dbBase);
    const records = await base(tableName).select({
      maxRecords: maxRecords,
      // It returns data in ascending order; otherwise random order
      view: "Grid view",
    }).firstPage();
    records.forEach((record) => {
      dbRecords.push(record.fields);
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

function cardMarkup(card: DatabaseRecord, index: number) {
  const cardName = card.ButtonText === 'Read More' ? "article" : "tool";
  return `<div class="card" id="${cardName}-${index}">
    <div><img class="card__thumbnail" src="${card.Thumbnail}" alt="${card.Title} thumbnail" title="${card.Title} thumbnail"></div>
    <div class="card__body">
      <h3 class="card__title">${card.Title}</h3>
      <p class="card__description my-s">${card.Description}</p>
      <a href="${card.LiveView}" class="btn" target="_blank">${card.ButtonText}</a>
    </div>
  </div>`;
}

export {
  createArray,
  listTags,
  getDatabaseRecord,
  renderDatabaseRecord,
  getDatabaseRecords,
  renderDatabaseRecords,
  cardMarkup,
};
