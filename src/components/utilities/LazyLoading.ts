import { renderDatabaseRecords, cardMarkup } from '../_utils';
import { showExperiencesMarkup } from '../Experience/_experience_markup';
import { showProjectsMarkup } from '../project/_project_markup';
import {
  AirTableDB,
  experienceTable,
  articleTable,
  projectTable,
  projectsContainer,
} from '../_variables';
import { initializeSlider } from '../Slider/Slider';
import { offset } from './LoadMore';

const xSec = document.getElementById('experience-section') as HTMLElement;
const projectsSec = document.getElementById('portfolio-section') as HTMLElement;
const articlesSec = document.getElementById('articles-section') as HTMLElement;
const testimonialsSec = document.getElementById('testimonials') as HTMLElement;
const xContainer = document.querySelector('.experiences') as HTMLDivElement;
const articlesContainer = document.querySelector('.articles') as HTMLDivElement;

function observeSection(currentSec: Element) {
  if (currentSec === xSec)
    renderUpdate(experienceTable, xContainer, showExperiencesMarkup);
  else if (currentSec === projectsSec)
    renderUpdate(projectTable, projectsContainer, showProjectsMarkup);
  else if (currentSec === articlesSec)
    renderUpdate(articleTable, articlesContainer, cardMarkup);
  else if (currentSec === testimonialsSec) initializeSlider();
}

// It fetches and renders the records and update the offset value.
async function renderUpdate(
  tableName: string,
  container: HTMLDivElement,
  markup: Function
) {
  const [data, newOffset] = await AirTableDB.getRecords(tableName);
  renderDatabaseRecords(data, container, markup);
  offset[tableName] = newOffset;
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
observer.observe(testimonialsSec);
