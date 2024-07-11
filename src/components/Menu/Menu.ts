import './Menu.scss'
import { removeClassFrom, addClassTo } from '../_utils';

// Select DOM Items
const menu = document.querySelector('.menu') as HTMLDivElement,
  brandLogo = document.querySelector('.brand__logo') as HTMLAnchorElement,
  menuOpen = document.querySelector('.hamburger-icon') as HTMLElement,
  menuClose = document.querySelector('.menu__close') as HTMLElement;

//  Open mobile menu
menuOpen.addEventListener('click', () => {
  addClassTo(menu, 'menu--active-js');
  addClassTo(brandLogo, 'brand__logo-js');
});

//  Close mobile menu
menuClose.addEventListener('click', () => {
  removeClassFrom(menu, 'menu--active-js');
  removeClassFrom(brandLogo, 'brand__logo-js');
});
