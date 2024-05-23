import { FieldSet } from "airtable";
import { loader } from "../components/Loader/Loader";

function capitalize(string: string) {
  // Capitalize the word, eg. movie to Movie
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function showLoader() {
  loader.classList.remove('loader-container--hide')
}

function hideLoader() {
  loader.classList.add('loader-container--hide')
}

function sortFieldsByNumericOrder(fields: FieldSet) {
  // Use a regex to extract numbers from field names and sort by those numbers
  return Object.keys(fields).sort((a, b) => {
    const matchA = a.match(/\d+/);
    const matchB = b.match(/\d+/);
    const numA = matchA ? parseInt(matchA[0], 10) : 0;
    const numB = matchB ? parseInt(matchB[0], 10) : 0;
    return numA - numB;
  });
}

function sortedArray(fieldNames: string[], fields: FieldSet) {
  // Return an array with values sorted by field names
  return fieldNames.map((fieldName) => fields[fieldName]);
}

export { capitalize, showLoader, hideLoader, sortFieldsByNumericOrder, sortedArray };
