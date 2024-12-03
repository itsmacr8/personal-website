import { createArray, listTags } from '../_utils';
import { DatabaseRecord } from '../../types/DatabaseRecord.interface';

function showProjectsMarkup(project: DatabaseRecord, index: number) {
  const {
    TagList,
    Order,
    Name,
    Description,
    LiveView,
    SourceCode,
    Thumbnail,
    AltText,
  } = project;
  const tagListArray = typeof TagList === 'string' ? createArray(TagList) : [];

  return `<div class='project' id='project-${index + 1}'>
    <div class='${Order}'>
      <h3 class='project__name'>${Name}</h3>
      <p class='project__description'>${Description}</p>
      <ul class='project__tag-list'>
        ${listTags(tagListArray)}
      </ul>
      <div class='project__cta-btn'>
        <a href='${LiveView}' class='btn'>
          <i class='fas fa-eye'></i> Live View
        </a>
        <a href='${SourceCode}' class='btn btn--outline'>
          <i class='fas fa-code'></i> Source Code
        </a>
      </div>
    </div>
    <div class='project__thumbnail'>
      <img src='${Thumbnail}' alt='${AltText}' title='${AltText}'>
    </div>
</div>`;
}

export { showProjectsMarkup };
