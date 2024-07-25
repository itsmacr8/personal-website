import './Project.scss'
import { showProjectsMarkup } from "./_project_markup";
import { projectDescriptionTable, AirTableDB } from '../_variables';
import { renderDatabaseRecords } from '../_utils'
import { addClassTo, removeClassFrom } from '../_utils';
import { loader, fetchProjectNumber, projectsContainer } from '../_variables';

const loadMoreProjects = document.getElementById('load-more-projects') as HTMLButtonElement;

loadMoreProjects.addEventListener('click', async () => {
  removeClassFrom(loader);
  const projects = await AirTableDB.getRecords(projectDescriptionTable, fetchProjectNumber);
  renderDatabaseRecords(
      projects.slice(3),
      projectsContainer,
      showProjectsMarkup
    );
  addClassTo(loader);
})
