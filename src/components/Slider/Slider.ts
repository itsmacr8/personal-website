import './Slider.scss';
import { renderDatabaseRecord } from '../_utils';
import { AirTableDB, testimonial, testimonialRecordID } from '../_variables';

const dotContainer = document.querySelector('.dots') as HTMLDivElement;

// Remove active class from all the slider dot element
function removeActiveClass() {
  if (dotContainer) {
    document.querySelectorAll('.dots__dot').forEach((dot) => {
      dot.classList.remove('dots__dot--active');
    });
  }
}

// Add active class to the slider dot that is currently active
function addActiveClass(slide: number) {
  if (dotContainer) {
    const dot = document.querySelector(`.dots__dot[data-slide='${slide}']`);
    dot && dot.classList.add('dots__dot--active');
  }
}

const initializeSlider = async () => {
  const record = await AirTableDB.getRecord(testimonial, testimonialRecordID);
  renderDatabaseRecord('.slider', record.slice(1));
  let currentSlide = 0;
  let maxSlide: number = 0;
  const slides = document.querySelectorAll('.slide') as NodeListOf<HTMLElement>;
  if (slides) maxSlide = slides.length - 1;

  // creating the dots for the slider
  const createDots = () => slides && slides.forEach((_, i) => { dot(i); });

  const dot = (dotNum: number) => {
    const btn = `<button class='dots__dot' data-slide='${dotNum}'></button>`;
    dotContainer && dotContainer.insertAdjacentHTML('beforeend', btn);
  };

  // moving the slide horizontally accordingly the slide number
  const goToSlide = (slide: number) => {
    if (slides) {
      slides.forEach(
        (s, i) => (s.style.transform = `translateX(${200 * (i - slide)}%)`)
      );
    }
  };

  const activeDot = (slide: number) => {
    removeActiveClass();
    addActiveClass(slide);
  };

  const prevSlide = () => {
    if (currentSlide == 0) currentSlide = maxSlide;
    else currentSlide--;
    goToSlide(currentSlide);
    activeDot(currentSlide);
  };

  const nextSlide = () => {
    if (currentSlide == maxSlide) currentSlide = 0;
    else currentSlide++;
    goToSlide(currentSlide);
    activeDot(currentSlide);
  };

  let slideInterval: number;
  const startSlider = () => (slideInterval = setInterval(nextSlide, 3000));
  const stopSlider = () => clearInterval(slideInterval);

  // Event listeners to stop the slider on mouse hover & restart on mouse leave
  // Event delegation relies on event bubbling. Since mouseenter and mouseleave
  // do not bubble up the DOM tree, unlike click event, we must attach listeners
  // directly to the target elements.
  if (slides) {
    slides.forEach((slide) => {
      slide.addEventListener('mouseenter', stopSlider);
      slide.addEventListener('mouseleave', startSlider);
    });
  }

  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowLeft' && prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  if (dotContainer) {
    dotContainer.addEventListener('click', function (e) {
      const target = e.target as HTMLElement;
      target.classList.contains('dots__dot') && handleSliderDotClick(target);
    });
  }

  const handleSliderDotClick = (target: HTMLElement) => {
    const slide = target.dataset.slide;
    if (slide) {
      goToSlide(+slide);
      activeDot(+slide);
    }
  };

  // Initializing the slider with the first slide
  createDots();
  activeDot(0);
  goToSlide(0);
  startSlider();
};

export { initializeSlider };
