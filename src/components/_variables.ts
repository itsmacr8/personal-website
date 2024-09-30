import { AirTable } from './Airtable/Airtable';

const HTextTableName: string = import.meta.env.VITE_PW_HTTN;
const aboutTextRecord: string = import.meta.env.VITE_PW_ATR;
const projectTable: string = import.meta.env.VITE_PW_PDTN;
const testimonial: string = import.meta.env.VITE_PW_TN;
const testimonialRecordID: string = import.meta.env.VITE_PW_TR;
const experienceTable: string = import.meta.env.VITE_PW_ETN;
const articleTable: string = import.meta.env.VITE_PW_ATN;
const countriesTable: string = import.meta.env.VITE_MP_CT;
const countriesRecordID: string = import.meta.env.VITE_MP_CR;
const loader = document.getElementById('loader-container') as HTMLDivElement;
const AirTableDB = new AirTable();
const projectsContainer = document.querySelector('.projects') as HTMLDivElement;

export {
  HTextTableName,
  aboutTextRecord,
  projectTable,
  testimonial,
  testimonialRecordID,
  experienceTable,
  articleTable,
  countriesTable,
  countriesRecordID,
  loader,
  AirTableDB,
  projectsContainer,
};
