import './Project.scss';
import { showProjectsMarkup } from './_project_markup';
import { projectTable, projectsContainer } from '../_variables';
import { projectOffset, loadMore } from '../utilities/LoadMore';

const load = document.getElementById('load-more-projects') as HTMLButtonElement;
load.addEventListener('click', () => {
  loadMore(
    projectTable,
    projectOffset,
    projectsContainer,
    showProjectsMarkup,
    load
  );
});
