import './Project.scss';
import { showProjectsMarkup } from './_project_markup';
import { projectTable, projectsContainer } from '../_variables';
import { offset, loadMore } from '../utilities/LoadMore';

const load = document.getElementById('load-more-projects') as HTMLButtonElement;
load.addEventListener('click', () => {
  loadMore(
    projectTable,
    offset[projectTable],
    projectsContainer,
    showProjectsMarkup,
    load
  );
});
