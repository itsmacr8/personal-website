import { articleTable, AirTableDB } from "../_variables";
import { renderDatabaseRecords, cardMarkup } from '../_utils'

renderDatabaseRecords(
  await AirTableDB.getRecords(articleTable),
  document.querySelector('.articles') as HTMLDivElement,
  cardMarkup
);
