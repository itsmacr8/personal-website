import { DatabaseRecord } from "../../types/DatabaseRecord.interface";

function showToolMarkup(tool: DatabaseRecord, index: number) {
  return `<div class="card" id="tool-${index}">
    <div><img class="card__thumbnail" src="${tool.Thumbnail}" alt="${tool.Name} thumbnail" title="${tool.Name} thumbnail"></div>
    <div class="card__body">
      <h3 class="card__title">${tool.Name}</h3>
      <p class="card__description my-s">${tool.Description}</p>
      <a href="${tool.LiveView}" class="btn" target="_blank">${tool.ButtonText}</a>
    </div>
  </div>`;
}

export { showToolMarkup }
