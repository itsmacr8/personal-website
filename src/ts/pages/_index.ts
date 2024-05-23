import '../../components/project/Project'
import { getAirTableBase, sortedArray, sortFieldsByNumericOrder } from "../_utils";

const api_key: string = import.meta.env.VITE_AIRTABLE_PWK;
const api_base: string = import.meta.env.VITE_AIRTABLE_PWB;
const HTextTableName: string = import.meta.env.VITE_AIRTABLE_PW_HTTN;
const heroTextRecord: string = import.meta.env.VITE_AIRTABLE_PW_HTR;
const aboutTextRecord: string = import.meta.env.VITE_AIRTABLE_PW_ATR;

async function getDBContent(recordID: string) {
  try {
    const base = getAirTableBase(api_key, api_base)
    const record = await base(HTextTableName).find(recordID);
    return sortedArray(sortFieldsByNumericOrder(record.fields), record.fields);
  } catch (err) {
    console.error(err);
  }
}

async function renderElement(selector: string, recordId: string) {
  const about = document.querySelector(selector) as HTMLDivElement;
  const aboutData = await getDBContent(recordId);
  if(aboutData) {
    // .slice(1) removes the first value which is primary key
    for (const data of aboutData.slice(1)) {
      data && about.insertAdjacentHTML('beforeend', `${data}`)
    }
  }
}

renderElement('.hero', heroTextRecord)
renderElement('.about__description', aboutTextRecord)
