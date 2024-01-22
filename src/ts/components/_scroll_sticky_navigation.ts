const scrollStickyNav: HTMLElement = document.querySelector('.scroll-sticky-navigation') as HTMLElement;
// Initialize the previous scroll position to zero
let previousScrollPosition: number = 0;
// To control the throttling of the scroll event
let isThrottling: boolean;


function getScrolledPosition(): number {
    return window.scrollY;
}

const isScrollingDown = (): boolean => {
    const scrolledPosition = getScrolledPosition();
    const isScrollDown: boolean = scrolledPosition > previousScrollPosition;

    // Temporarily solution to fix the issue with the sticky navbar
    // when clicking on the hamburger menu to show the navbar links
    // on tablet and mobile. 100 is a random number and it works fine.
    previousScrollPosition = scrolledPosition + 100;
    return isScrollDown;
};

const handleNavScroll = () => {
    if (isScrollingDown() && !scrollStickyNav?.contains(document.activeElement)) {
        scrollStickyNav?.classList.add('scroll-down');
        scrollStickyNav?.classList.remove('scroll-up');
    } else {
        scrollStickyNav?.classList.add('scroll-up');
        scrollStickyNav?.classList.remove('scroll-down');
    }
};

const throttleTimer = (callback: Function, time: number) => {
    if (isThrottling) return;

    isThrottling = true;
    setTimeout(() => {
        callback();
        isThrottling = false;
    }, time);
};

const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
window.addEventListener('scroll', () => {
    if (mediaQuery && !mediaQuery.matches) {
        throttleTimer(handleNavScroll, 750);
    }
});

// To fix the navigation covering content on scroll
// when user clicks on a link to scroll to a specific section.
const navigationHeight = scrollStickyNav.offsetHeight;
document.documentElement.style.setProperty(
    '--scroll-padding',
    `${navigationHeight}px`
);
