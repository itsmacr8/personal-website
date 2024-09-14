import './Project.scss';
import { showProjectsMarkup } from './_project_markup';
import { loader, AirTableDB, projectTable, projectsContainer } from '../_variables';
import { renderDatabaseRecords, addClassTo, removeClassFrom } from '../_utils';

const load = document.getElementById('load-more-projects') as HTMLButtonElement;

load.addEventListener('click', async () => {
  removeClassFrom(loader);
  const [data, newOffset] = await AirTableDB.getRecords(projectTable, projectOffset);
  updateOffset(projectTable, newOffset);
  renderDatabaseRecords(data, projectsContainer, showProjectsMarkup);
  addClassTo(loader);
  !newOffset && addClassTo(load);
});

let projectOffset: string = '';

function updateOffset(tableName: string, offset: string) {
  if (tableName == projectTable) projectOffset = offset;
}

export { updateOffset }
