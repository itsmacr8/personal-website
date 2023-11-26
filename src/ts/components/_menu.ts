// Select DOM Items
const menuBtn = document.querySelector('.menu-btn')!;
const menu = document.querySelector('.menu')!;
const menuNav = document.querySelector('.menu__nav')!;
const menuBranding = document.querySelector('.menu__branding')!;
const navItems = document.querySelectorAll('.menu__nav__item')!;

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('close');
    menu.classList.toggle('show');
    menuNav.classList.toggle('show');
    menuBranding.classList.toggle('show');
    navItems.forEach((item) => item.classList.toggle('show'));
});
