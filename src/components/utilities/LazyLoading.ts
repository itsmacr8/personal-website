import { renderDatabaseRecords, cardMarkup } from '../_utils';
import { showExperiencesMarkup } from '../Experience/_experience_markup';
import { showProjectsMarkup } from '../project/_project_markup';
import {
  AirTableDB,
  experienceTable,
  toolsTable,
  articleTable,
  projectDescriptionTable,
  projectsContainer,
} from '../_variables';
import { initializeSlider } from '../Slider/Slider';

const xSec = document.getElementById('experience-section') as HTMLElement;
const toolsSec = document.getElementById('tools-section') as HTMLElement;
const projectsSec = document.getElementById('portfolio-section') as HTMLElement;
const articlesSec = document.getElementById('articles-section') as HTMLElement;
const testimonialsSec = document.getElementById('testimonials') as HTMLElement;
const xContainer = document.querySelector('.experiences') as HTMLDivElement;
const toolsContainer = document.querySelector('.tools') as HTMLDivElement;
const articlesContainer = document.querySelector('.articles') as HTMLDivElement;
const xData = await AirTableDB.getRecords(experienceTable);
const toolsData = await AirTableDB.getRecords(toolsTable);
const projectsData = await AirTableDB.getRecords(projectDescriptionTable);
const articlesData = await AirTableDB.getRecords(articleTable);

function observeSection(currentSec: Element) {
  if (currentSec === xSec)
    renderDatabaseRecords(xData, xContainer, showExperiencesMarkup);
  else if (currentSec === toolsSec)
    renderDatabaseRecords(toolsData, toolsContainer, cardMarkup);
  else if (currentSec === projectsSec)
    renderDatabaseRecords(projectsData, projectsContainer, showProjectsMarkup);
  else if (currentSec === articlesSec)
    renderDatabaseRecords(articlesData, articlesContainer, cardMarkup);
  else if (currentSec === testimonialsSec)
    initializeSlider()
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
observer.observe(toolsSec);
observer.observe(projectsSec);
observer.observe(articlesSec);
observer.observe(testimonialsSec);
