import { renderDatabaseRecord } from '../_utils';
import { AirTableDB, HTextTableName, aboutTextRecord } from '../_variables';

const record = await AirTableDB.getRecord(HTextTableName, aboutTextRecord);
// .slice(1) removes the first value which is primary key
renderDatabaseRecord('.about__description', record.slice(1));
