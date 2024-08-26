import './Project.scss';
import { showProjectsMarkup } from './_project_markup';
import { projectDescriptionTable, AirTableDB } from '../_variables';
import { renderDatabaseRecords } from '../_utils';
import { addClassTo, removeClassFrom } from '../_utils';
import { projectsContainer, loader, totalProject } from '../_variables';

const load = document.getElementById('load-more-projects') as HTMLButtonElement;

renderDatabaseRecords(
  await AirTableDB.getRecords(projectDescriptionTable),
  projectsContainer,
  showProjectsMarkup
);

load.addEventListener('click', async () => {
  removeClassFrom(loader);
  const projects = await AirTableDB.getRecords(
    projectDescriptionTable,
    totalProject
  );
  renderDatabaseRecords(
    projects.slice(3),
    projectsContainer,
    showProjectsMarkup
  );
  addClassTo(loader);
  addClassTo(load);
});
