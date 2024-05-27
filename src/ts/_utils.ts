import Airtable, { Base, FieldSet } from "airtable";

function capitalize(string: string) {
  // Capitalize the word, eg. movie to Movie
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getAirTableBase(api_key: string, api_base: string): Base {
  return new Airtable({ apiKey: api_key }).base(api_base)
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

export { capitalize, getAirTableBase, sortFieldsByNumericOrder, sortedArray };
