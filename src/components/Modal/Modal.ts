import './Modal.scss'

const modal = document.querySelector('.modal') as HTMLDivElement;

function waitFor(ms: number) {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

async function showModal(modal:HTMLDivElement) {
    modal.classList.remove('modal--hide')
    await waitFor(450);
    modal.classList.add('modal--show')
}

async function closeModal(modal:HTMLDivElement) {
    modal.classList.remove('modal--db-mess')
    modal.classList.remove('modal--show')
    await waitFor(850);
    modal.classList.add('modal--hide')
}

async function autoCloseModal(modal:HTMLDivElement) {
    await waitFor(5000);
    closeModal(modal)
}

// close modal window with click on close button or outside of the modal
modal.addEventListener("click", function (e) {
    const target = e.target as HTMLElement
    if (target.classList.contains('modal__close')) closeModal(modal)
    else if (target.classList.contains('modal--show')) closeModal(modal)
})

// close modal window with keyboard (Escape key)
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('modal--show'))
        closeModal(modal);
});

export { modal, showModal, autoCloseModal }
