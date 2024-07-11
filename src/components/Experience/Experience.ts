import './Experience.scss'

import { showExperiencesMarkup } from './_experience_markup';
import { experienceTable, AirTableDB } from '../_variables';
import { renderDatabaseRecords } from '../_utils'

renderDatabaseRecords(
  await AirTableDB.getRecords(experienceTable),
  document.querySelector(".experiences") as HTMLDivElement,
  showExperiencesMarkup
);
