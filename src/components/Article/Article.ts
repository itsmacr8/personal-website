import { articleTable } from "../_variables";
import { getDatabaseRecords, renderDatabaseRecords, cardMarkup } from '../_utils'

renderDatabaseRecords(
  await getDatabaseRecords(articleTable),
  document.querySelector('.articles') as HTMLDivElement,
  cardMarkup
);
