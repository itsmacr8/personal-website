import './Project.scss'
import { showProjectsMarkup } from "./_project_markup";
import { projectDescriptionTable, AirTableDB } from '../_variables';
import { renderDatabaseRecords } from '../_utils'
import { addClassTo, removeClassFrom } from '../_utils';
import { loader, fetchProjectNumber } from '../_variables';

const projectContainer = document.querySelector(".projects") as HTMLDivElement
const loadMoreProjects = document.getElementById('load-more-projects') as HTMLButtonElement;


renderDatabaseRecords(
  await AirTableDB.getRecords(projectDescriptionTable),
  projectContainer,
  showProjectsMarkup
);

loadMoreProjects.addEventListener('click', async () => {
  removeClassFrom(loader);
  const projects = await AirTableDB.getRecords(projectDescriptionTable, fetchProjectNumber);
  renderDatabaseRecords(
      projects.slice(3),
      projectContainer,
      showProjectsMarkup
    );
  addClassTo(loader);
})
