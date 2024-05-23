import { createArray, listTags, DatabaseRecord } from "../_utils"

function showProjectsMarkup(project:DatabaseRecord, index:number) {
  return`<div class="project" id="project-${index+1}">
    <div class="${project.Order}">
      <h2 class="project__name">${project.Name}</h2>
      <p class="project__description">${project.Description}</p>
      <ul class="project__tag-list">
        ${listTags(createArray(project.TagList))}
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
      <img src="${project.Thumbnail}" title="Learn magic thumbnail" alt="Learn magic thumbnail">
    </div>
</div>`
}

export { showProjectsMarkup }
