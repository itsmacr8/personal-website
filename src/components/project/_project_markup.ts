import { createArray, listTags } from "../_utils"
import { DatabaseRecord } from "../../types/DatabaseRecord.interface"

function showProjectsMarkup(project:DatabaseRecord, index:number) {
  const tagListArray =
    typeof project.TagList === "string" ? createArray(project.TagList) : [];

  return`<div class="project" id="project-${index+1}">
    <div class="${project.Order}">
      <h3 class="project__name">${project.Name}</h3>
      <p class="project__description">${project.Description}</p>
      <ul class="project__tag-list">
        ${listTags(tagListArray)}
      </ul>
      <div class="project__cta-btn">
        <a href="${project.LiveView}"
        class="btn">
        <i class="fas fa-eye"></i> Live View
        </a>
        <a href="${project.SourceCode}"
        class="btn btn--outline">
        <i class="fas fa-code"></i> Source Code
        </a>
      </div>
    </div>
    <div class="project__thumbnail">
      <img src="${project.Thumbnail}" title="${project.Name} thumbnail" alt="${project.Name} thumbnail">
    </div>
</div>`
}

export { showProjectsMarkup }
