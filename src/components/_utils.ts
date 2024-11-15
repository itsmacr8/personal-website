import {
  RecordDataType,
  FieldSet,
  DatabaseRecord,
} from '../types/DatabaseRecord.interface';

function capitalize(string: string) {
  // Capitalize the word, eg. movie to Movie
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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

function renderDatabaseRecord(selector: string, records: RecordDataType[]) {
  const selectElement = document.querySelector(selector) as HTMLDivElement;
  for (const record of records) {
    record && selectElement.insertAdjacentHTML('beforeend', `${record}`);
  }
}

function renderDatabaseRecords(
  databaseRecords: DatabaseRecord[],
  container: HTMLDivElement,
  markupFunction: Function
) {
  databaseRecords.forEach((databaseRecord: DatabaseRecord, index: number) => {
    container.insertAdjacentHTML(
      'beforeend',
      markupFunction(databaseRecord, index)
    );
  });
}

function cardMarkup(card: FieldSet, index: number) {
  const cardName = 'article';
  return `<div class='card' id='${cardName}-${index}'>
    <div><img class='card__thumbnail' src='${card.Thumbnail}' alt='${card.Title} thumbnail' title='${card.Title} thumbnail'></div>
    <div class='card__body'>
      <h3 class='card__title'>${card.Title}</h3>
      <p class='card__description my-s'>${card.Description}</p>
      <a href='${card.LiveView}' class='btn' target='_blank'>${card.ButtonText}</a>
    </div>
  </div>`;
}

function removeClassFrom(element: HTMLElement, className: string = 'hide') {
  element.classList.remove(className);
}

function addClassTo(element: HTMLElement, className: string = 'hide') {
  element.classList.add(className);
}

function sortFieldsByNumericOrder(fields: FieldSet) {
  // Use a regex to extract numbers from field names and sort by those numbers
  return Object.keys(fields).sort((a, b) => {
    const matchA = a.match(/\d+/);
    const matchB = b.match(/\d+/);
    const numA = matchA ? parseInt(matchA[0], 10) : 0;
    const numB = matchB ? parseInt(matchB[0], 10) : 0;
    return numA - numB;
  });
}

function sortedArray(fieldNames: string[], fields: FieldSet) {
  // Return an array with values sorted by field names
  return fieldNames.map((fieldName) => fields[fieldName]);
}

export {
  capitalize,
  createArray,
  listTags,
  renderDatabaseRecord,
  renderDatabaseRecords,
  cardMarkup,
  addClassTo,
  removeClassFrom,
  sortFieldsByNumericOrder,
  sortedArray,
};
