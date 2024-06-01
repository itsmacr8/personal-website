import './Loader.scss'

function showLoader() {
  loader.classList.remove('loader-container--hide');
}

function hideLoader() {
  loader.classList.add('loader-container--hide');
}

const loader = document.getElementById('loader-container') as HTMLDivElement
window.onload = () => hideLoader()

export { loader, showLoader, hideLoader }
