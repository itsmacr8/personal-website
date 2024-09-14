import { renderDatabaseRecords, cardMarkup } from '../_utils';
import { showExperiencesMarkup } from '../Experience/_experience_markup';
import { showProjectsMarkup } from '../project/_project_markup';
import {
  AirTableDB,
  experienceTable,
  articleTable,
  projectDescriptionTable,
  projectsContainer,
} from '../_variables';

const xSec = document.getElementById('experience-section') as HTMLElement;
const projectsSec = document.getElementById('portfolio-section') as HTMLElement;
const articlesSec = document.getElementById('articles-section') as HTMLElement;
const xContainer = document.querySelector('.experiences') as HTMLDivElement;
const articlesContainer = document.querySelector('.articles') as HTMLDivElement;
const xData = await AirTableDB.getRecords(experienceTable);
const projectsData = await AirTableDB.getRecords(projectDescriptionTable);
const articlesData = await AirTableDB.getRecords(articleTable);

function observeSection(currentSec: Element) {
  if (currentSec === xSec)
    renderDatabaseRecords(xData, xContainer, showExperiencesMarkup);
  else if (currentSec === projectsSec)
    renderDatabaseRecords(projectsData, projectsContainer, showProjectsMarkup);
  else if (currentSec === articlesSec)
    renderDatabaseRecords(articlesData, articlesContainer, cardMarkup);
}

const options = {
  rootMargin: '150px',
  root: null, // Use the viewport as the root
  threshold: 0, // Trigger as soon as any part of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      observeSection(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, options);

observer.observe(xSec);
observer.observe(projectsSec);
observer.observe(articlesSec);
