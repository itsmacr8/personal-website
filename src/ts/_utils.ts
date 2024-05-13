function capitalize(string: string) {
  // Capitalize the word, eg. movie to Movie
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export { capitalize };
