import { toolsTable, AirTableDB } from "../_variables";
import { renderDatabaseRecords, cardMarkup } from '../_utils'

renderDatabaseRecords(
  await AirTableDB.getRecords(toolsTable),
  document.querySelector('.tools') as HTMLDivElement,
  cardMarkup
);


