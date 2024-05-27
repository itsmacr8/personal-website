import './Experience.scss'

import { showExperiencesMarkup } from './_experience_markup';
import { experienceTable } from '../_variables';
import { getDatabaseRecords, renderDatabaseRecords } from '../_utils'

renderDatabaseRecords(
  await getDatabaseRecords(experienceTable),
  document.querySelector(".experiences") as HTMLDivElement,
  showExperiencesMarkup
);
