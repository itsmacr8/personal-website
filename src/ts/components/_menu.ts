// Select DOM Items
const body = document.querySelector('body')! as HTMLBodyElement,
    menu = document.querySelector('.menu')! as HTMLDivElement,
    UIIcon = document.querySelector('.ui-icon')! as HTMLDivElement,
    brandLogo = document.querySelector('.brand__logo')! as HTMLAnchorElement,
    sunIcon = document.querySelector('.ui-icon__sun')! as HTMLElement,
    moonIcon = document.querySelector('.ui-icon__moon')! as HTMLElement,
    menuOpen = document.querySelector('.hamburger-icon')! as HTMLElement,
    menuClose = document.querySelector('.menu__close')! as HTMLElement;


function getUIMode() {
    return localStorage.getItem('ui-mode');
}

// If the user has dark mode enabled or
// he has previously visited with dark mode enabled
function InitUIMode() {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const UIMode = getUIMode();
    if (UIMode !== 'light' && isDark || UIMode === 'dark') {
        body.classList.add('dark');
        sunIcon.classList.add('active-ui');
    } else if (!isDark || UIMode === 'light') {
        moonIcon.classList.add('active-ui');
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
    const currentMode = getUIMode()
    if (currentMode === 'light') {
        moonIcon.classList.add('active-ui');
        sunIcon.classList.remove('active-ui');
    } else if (currentMode === 'dark') {
        sunIcon.classList.add('active-ui');
        moonIcon.classList.remove('active-ui');
    }
}

// Toggle UI mode
UIIcon.addEventListener('click', () => {
    body.classList.toggle('dark');
    UpdateUIMode()
    updateIcon()
});

//  Open mobile menu
menuOpen.addEventListener('click', () => {
    menu.classList.add('menu--active-js');
    brandLogo.classList.add('brand__logo-js');
});

//  Close mobile menu
menuClose.addEventListener('click', () => {
    menu.classList.remove('menu--active-js');
    brandLogo.classList.remove('brand__logo-js');
});

InitUIMode()
