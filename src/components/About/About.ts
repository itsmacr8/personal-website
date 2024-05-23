import {
  getAirTableBase,
  sortedArray,
  sortFieldsByNumericOrder,
} from "../../ts/_utils";
import { pw_key, pw_base, HTextTableName } from "../_variables";

async function getData(recordID: string) {
  try {
    const base = getAirTableBase(pw_key, pw_base);
    const record = await base(HTextTableName).find(recordID);
    return sortedArray(sortFieldsByNumericOrder(record.fields), record.fields);
  } catch (err) {
    console.error(err);
  }
}

async function renderText(selector: string, recordId: string) {
  const selectElement = document.querySelector(selector) as HTMLDivElement;
  const resData = await getData(recordId);
  if (resData) {
    // .slice(1) removes the first value which is primary key
    for (const data of resData.slice(1)) {
      data && selectElement.insertAdjacentHTML("beforeend", `${data}`);
    }
  }
}

export { renderText };
