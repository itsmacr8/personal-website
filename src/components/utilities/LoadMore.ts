import { loader, AirTableDB } from '../_variables';
import { renderDatabaseRecords, addClassTo, removeClassFrom } from '../_utils';
import { Offset } from '../../types/LoadMore.interface';

const offset: Offset = {};

async function loadMore(
  tableName: string,
  prevOffset: string,
  container: HTMLDivElement,
  markup: Function,
  loadButton: HTMLButtonElement
) {
  removeClassFrom(loader);
  const [data, newOffset] = await AirTableDB.getRecords(tableName, prevOffset);
  offset[tableName] = newOffset;
  renderDatabaseRecords(data, container, markup);
  addClassTo(loader);
  !newOffset && addClassTo(loadButton);
}

export { offset, loadMore };
