import { HTextTableName, heroTextRecord, aboutTextRecord } from "../_variables";
import { getDatabaseRecord, renderDatabaseRecord, sortedArray, sortFieldsByNumericOrder } from "../_utils";

async function renderText(
  tableName: string,
  recordID: string,
  containerSelector: string
) {
  const record = await getDatabaseRecord(tableName, recordID);
  if (record) {
    renderDatabaseRecord(
      containerSelector,
      // .slice(1) removes the first value which is primary key
      sortedArray(sortFieldsByNumericOrder(record), record).slice(1)
    );
  }
}

renderText(HTextTableName, heroTextRecord, ".hero");
renderText(HTextTableName, aboutTextRecord, ".about__description");
