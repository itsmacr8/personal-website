import { AirTable } from "./Airtable/Airtable";

const pw_key: string = import.meta.env.VITE_AIRTABLE_PWK;
const pw_base: string = import.meta.env.VITE_AIRTABLE_PWB;
const HTextTableName: string = import.meta.env.VITE_AIRTABLE_PW_HTTN;
const heroTextRecord: string = import.meta.env.VITE_AIRTABLE_PW_HTR;
const aboutTextRecord: string = import.meta.env.VITE_AIRTABLE_PW_ATR;
const projectDescriptionTable: string = import.meta.env.VITE_AIRTABLE_PW_PDTN;
const toolsTable: string = import.meta.env.VITE_AIRTABLE_PW_TTN;
const experienceTable: string = import.meta.env.VITE_AIRTABLE_PW_ETN;
const articleTable: string = import.meta.env.VITE_AIRTABLE_PW_ATN;
const fetchProjectNumber: number = Number(import.meta.env.VITE_FETCH_PROJECT_NUMBER);
const loader = document.getElementById('loader-container') as HTMLDivElement
const AirTableDB = new AirTable();
const projectsContainer = document.querySelector(".projects") as HTMLDivElement;

export {
  pw_key,
  pw_base,
  HTextTableName,
  heroTextRecord,
  aboutTextRecord,
  projectDescriptionTable,
  toolsTable,
  experienceTable,
  articleTable,
  loader,
  fetchProjectNumber,
  AirTableDB,
  projectsContainer,
};
