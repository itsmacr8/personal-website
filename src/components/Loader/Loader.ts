import './Loader.scss'
import { hideLoader } from '../../ts/_utils'

const loader = document.getElementById('loader-container') as HTMLDivElement
window.onload = () => hideLoader()

export { loader }
