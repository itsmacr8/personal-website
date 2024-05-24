import { showToolMarkup } from "./_tool_markup";
import { DatabaseRecord } from "../../types/DatabaseRecord.interface";
import { getAirTableBase } from "../../ts/_utils";
import { pw_key, pw_base } from "../_variables";

const toolsContainer = document.querySelector('.tools') as HTMLDivElement

async function getTools(tableName: string) {
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

function renderTools(tools: DatabaseRecord[]) {
  tools.forEach((tool: DatabaseRecord, index: number) => {
    toolsContainer.insertAdjacentHTML(
      "beforeend",
      showToolMarkup(tool, index)
    );
  });
}

export { renderTools, getTools };
