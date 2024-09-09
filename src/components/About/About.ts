import {
  HTextTableName,
  aboutTextRecord,
} from "../_variables";
import {
  renderDatabaseRecord,
  getSortedRecord
} from "../_utils";

const record = await getSortedRecord(HTextTableName, aboutTextRecord)
renderDatabaseRecord('.about__description', record);
