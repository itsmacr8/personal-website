import { showToolMarkup } from "./_tool_markup";
import { toolsTable } from "../_variables";
import { getDatabaseRecords, renderDatabaseRecords } from '../_utils'

renderDatabaseRecords(
  await getDatabaseRecords(toolsTable),
  document.querySelector('.tools') as HTMLDivElement,
  showToolMarkup
);
