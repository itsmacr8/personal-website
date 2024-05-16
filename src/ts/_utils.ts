import { loader } from "../components/Loader/Loader";

function capitalize(string: string) {
  // Capitalize the word, eg. movie to Movie
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function showLoader() {
  loader.classList.remove('loader-container--hide')
}

function hideLoader() {
  loader.classList.add('loader-container--hide')
}

export { capitalize, showLoader, hideLoader };
