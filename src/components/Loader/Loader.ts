import './Loader.scss'

const loader = document.getElementById('loader-container') as HTMLDivElement
window.onload = () => loader.classList.add('loader-container--hide')
