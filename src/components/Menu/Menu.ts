import './Menu.scss'

// Select DOM Items
const menu = document.querySelector('.menu')! as HTMLDivElement,
    brandLogo = document.querySelector('.brand__logo')! as HTMLAnchorElement,
    menuOpen = document.querySelector('.hamburger-icon')! as HTMLElement,
    menuClose = document.querySelector('.menu__close')! as HTMLElement;

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
