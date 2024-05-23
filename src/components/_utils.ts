interface DatabaseRecord {
  [key: string]: any
}

function createArray(string:string) {
  // Receive a comma separated string and convert them to an array.
  // For example, 'Hello, World' to ['Hello', 'World']
  return string.split(',').map(skill => skill.trim());
}

function listTags(tags: string[]) {
  let tagsMarkup = ''
  for (const tag of tags) {
     tagsMarkup += `<li class='project__tag'>${tag}</li>`
  }
  return tagsMarkup
}

export { createArray, listTags }
export type { DatabaseRecord }
