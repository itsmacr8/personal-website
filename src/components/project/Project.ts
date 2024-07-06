import './Project.scss'
import { showProjectsMarkup } from "./_project_markup";
import { projectDescriptionTable } from '../_variables';
import { getDatabaseRecords, renderDatabaseRecords } from '../_utils'
import { addClassTo, removeClassFrom } from '../_utils';
import { loader, fetchProjectNumber } from '../_variables';

const projectContainer = document.querySelector(".projects") as HTMLDivElement
const loadMoreProjects = document.getElementById('load-more-projects') as HTMLButtonElement;


renderDatabaseRecords(
  await getDatabaseRecords(projectDescriptionTable),
  projectContainer,
  showProjectsMarkup
);

loadMoreProjects.addEventListener('click', async () => {
  removeClassFrom(loader);
  const projects = await getDatabaseRecords(projectDescriptionTable, fetchProjectNumber);
  renderDatabaseRecords(
      projects.slice(3),
      projectContainer,
      showProjectsMarkup
    );
  addClassTo(loader);
})
