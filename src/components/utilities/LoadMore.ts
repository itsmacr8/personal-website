import { loader, AirTableDB, projectTable } from '../_variables';
import { renderDatabaseRecords, addClassTo, removeClassFrom } from '../_utils';

let projectOffset: string = '';

function updateOffset(tableName: string, offset: string) {
  if (tableName == projectTable) projectOffset = offset;
}

async function loadMore(
  tableName: string,
  offset: string,
  container: HTMLDivElement,
  markup: Function,
  loadButton: HTMLButtonElement
) {
  removeClassFrom(loader);
  const [data, newOffset] = await AirTableDB.getRecords(tableName, offset);
  updateOffset(tableName, newOffset);
  renderDatabaseRecords(data, container, markup);
  addClassTo(loader);
  !newOffset && addClassTo(loadButton);
}

export { projectOffset, updateOffset, loadMore };
