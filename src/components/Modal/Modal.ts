import './Modal.scss';
import { removeClassFrom, addClassTo } from '../_utils';

const modal = document.querySelector('.modal') as HTMLDivElement;

function waitFor(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

async function showModal(modal: HTMLDivElement) {
  removeClassFrom(modal);
  await waitFor(450);
  addClassTo(modal, 'modal--show');
}

async function closeModal(modal: HTMLDivElement) {
  removeClassFrom(modal, 'modal--show');
  await waitFor(850);
  addClassTo(modal);
  removeClassFrom(modal, 'modal--db-mess');
}

async function autoCloseModal(modal: HTMLDivElement) {
  await waitFor(5000);
  closeModal(modal);
}

// close modal window with click on close button or outside of the modal
// There is no modal in the homepage and it throws error.
// Optional chaining will handle the homepage error
modal?.addEventListener('click', function (e) {
  const target = e.target as HTMLElement;
  if (target.classList.contains('modal__close')) closeModal(modal);
  else if (target.classList.contains('modal--show')) closeModal(modal);
});

// close modal window with keyboard (Escape key)
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && modal.classList.contains('modal--show'))
    closeModal(modal);
});

export { modal, showModal, autoCloseModal };
