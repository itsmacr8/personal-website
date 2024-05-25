import './Project.scss'
import { showProjectsMarkup } from "./_project_markup";
import { projectDescriptionTable } from '../_variables';
import { getDatabaseRecords, renderDatabaseRecords } from '../_utils'

renderDatabaseRecords(
  await getDatabaseRecords(projectDescriptionTable),
  document.querySelector(".projects") as HTMLDivElement,
  showProjectsMarkup
);
