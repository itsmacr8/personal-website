import { DatabaseRecord } from "../../types/DatabaseRecord.interface"

function showExperiencesMarkup(experience:DatabaseRecord, index:number) {
  return`<div class="${experience.Order}" id="experience-${index+1}">
    <h3 class="experience__position">${experience.Position}</h3>
    <h4 class="experience__company">${experience.Company}</h4>
    <p class="experience__period">${experience.Duration}</p>
    <ul class="experience__contributions">${experience.Contributions}</ul>
  </div>`
}

export { showExperiencesMarkup }
