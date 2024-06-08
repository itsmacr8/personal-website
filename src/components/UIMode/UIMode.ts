import './UIMode.scss'
import { removeClassFrom, addClassTo } from '../_utils';

const body = document.querySelector('body')! as HTMLBodyElement,
    UIIcon = document.querySelector('.ui-icon')! as HTMLDivElement,
    sunIcon = document.querySelector('.ui-icon__sun')! as HTMLElement,
    moonIcon = document.querySelector('.ui-icon__moon')! as HTMLElement;

function getUIMode() {
    return localStorage.getItem('ui-mode');
}

// If the user has dark mode enabled or
// he has previously visited with dark mode enabled
function InitUIMode() {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const UIMode = getUIMode();
    if ((UIMode !== 'light' && isDark) || UIMode === 'dark') {
      addClassTo(body, 'dark');
      addClassTo(sunIcon, 'active-ui');
    } else if (!isDark || UIMode === 'light') {
      addClassTo(moonIcon, 'active-ui');
    }
}

// Save UI mode in localStorage
function UpdateUIMode() {
    if (body.classList.contains('dark')) {
        localStorage.setItem('ui-mode', 'dark');
    } else {
        localStorage.setItem('ui-mode', 'light');
    }
}

// Update the UI icon
function updateIcon() {
  const currentMode = getUIMode();
  if (currentMode === 'light') {
    addClassTo(moonIcon, 'active-ui');
    removeClassFrom(sunIcon, 'active-ui');
  } else if (currentMode === 'dark') {
    addClassTo(sunIcon, 'active-ui');
    removeClassFrom(moonIcon, 'active-ui');
  }
}

// Toggle UI mode
UIIcon.addEventListener('click', () => {
    body.classList.toggle('dark');
    UpdateUIMode()
    updateIcon()
});

InitUIMode()
