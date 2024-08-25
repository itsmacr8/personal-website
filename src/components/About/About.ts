import {
  HTextTableName,
  aboutTextRecord,
  AirTableDB,
} from "../_variables";
import {
  renderDatabaseRecord,
  sortedArray,
  sortFieldsByNumericOrder,
} from "../_utils";

async function renderText(
  tableName: string,
  recordID: string,
  containerSelector: string
) {
  const record = await AirTableDB.getRecord(tableName, recordID);
  if (record) {
    renderDatabaseRecord(
      containerSelector,
      // .slice(1) removes the first value which is primary key
      sortedArray(sortFieldsByNumericOrder(record), record).slice(1)
    );
  }
}

renderText(HTextTableName, aboutTextRecord, ".about__description");
