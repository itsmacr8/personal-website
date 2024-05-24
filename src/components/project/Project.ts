import './Project.scss'

import { getAirTableBase } from "../../ts/_utils";
import { showProjectsMarkup } from "./_project_markup";
import { DatabaseRecord } from "../../types/DatabaseRecord.interface";
import {
  pw_key,
  pw_base,
  projectsContainer,
} from "../_variables";

async function getProjects(tableName: string) {
  // Table name to show data from the table
  const projects:DatabaseRecord[] = [];
  try {
    const base = getAirTableBase(pw_key, pw_base);
    await base(tableName)
      .select({
        maxRecords: 3,
      })
      .eachPage((records, fetchNextPage) => {
        records.forEach(function (record) {
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
    projectsContainer.insertAdjacentHTML(
      "beforeend",
      showProjectsMarkup(project, index)
    );
  });
}

export { renderProjects, getProjects };
