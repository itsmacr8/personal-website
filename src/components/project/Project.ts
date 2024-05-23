import { getAirTableBase } from "../../ts/_utils";
import { showProjectsMarkup } from "./_project_markup";
import { DatabaseRecord } from "../_utils"


const projectsContainer = document.querySelector('.projects') as HTMLDivElement
const api_key: string = import.meta.env.VITE_AIRTABLE_PWK;
const api_base: string = import.meta.env.VITE_AIRTABLE_PWB;
const projectDescriptionTable: string = import.meta.env.VITE_AIRTABLE_PW_PDTN;


async function getProjectList(tableName:string) {
  // Table name to show data from the table
  const projects:DatabaseRecord[] = [];
  try {
    const base = getAirTableBase(api_key, api_base)
    await base(tableName).select({
      maxRecords: 3,
    }).eachPage((records, fetchNextPage) => {
      records.forEach(function(record) {
        projects.push(record.fields);
      });
      fetchNextPage();
    });
    return projects;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

function renderProjects(projects: DatabaseRecord[]) {
  projects.forEach((project: DatabaseRecord, index: number) => {
    projectsContainer.insertAdjacentHTML('beforeend', showProjectsMarkup(project, index))
  });
}

const projects = await getProjectList(projectDescriptionTable)
renderProjects(projects)
