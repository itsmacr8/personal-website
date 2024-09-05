import { AirTable } from "./Airtable/Airtable";

const pwKey: string = import.meta.env.VITE_PWK;
const pwBase: string = import.meta.env.VITE_PWB;
const HTextTableName: string = import.meta.env.VITE_PW_HTTN;
const aboutTextRecord: string = import.meta.env.VITE_PW_ATR;
const projectDescriptionTable: string = import.meta.env.VITE_PW_PDTN;
const testimonial: string = import.meta.env.VITE_PW_TN;
const testimonialRecordID: string = import.meta.env.VITE_PW_TR;
const toolsTable: string = import.meta.env.VITE_PW_TTN;
const experienceTable: string = import.meta.env.VITE_PW_ETN;
const articleTable: string = import.meta.env.VITE_PW_ATN;
const totalProject: number = Number(import.meta.env.VITE_TOTAL_PROJECT);
const loader = document.getElementById('loader-container') as HTMLDivElement;
const AirTableDB = new AirTable();
const projectsContainer = document.querySelector('.projects') as HTMLDivElement;

export {
  pwKey,
  pwBase,
  HTextTableName,
  aboutTextRecord,
  projectDescriptionTable,
  testimonial,
  testimonialRecordID,
  toolsTable,
  experienceTable,
  articleTable,
  loader,
  totalProject,
  AirTableDB,
  projectsContainer,
};
