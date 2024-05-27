import { toolsTable } from "../_variables";
import { getDatabaseRecords, renderDatabaseRecords, cardMarkup } from '../_utils'

renderDatabaseRecords(
  await getDatabaseRecords(toolsTable),
  document.querySelector('.tools') as HTMLDivElement,
  cardMarkup
);
