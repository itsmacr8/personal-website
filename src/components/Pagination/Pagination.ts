import './Pagination.scss';

class Pagination {
  currentPage = 1;
  container = document.getElementById('pagination') as HTMLDivElement;
  total: number = 1;

  show(currentPage: number = 1, totalPages: number) {
    this.clear();
    if (this.total < 1) return;
    this.container.classList.add('mt-2');
    this.currentPage = currentPage;
    const { start, end } = this.getCurrentNumber(totalPages);
    this.prevButton();
    for (let btn = start; btn <= end; btn++) this.buttons(btn);
    this.nextButton(totalPages);
  }

  clear() {
    this.container.innerHTML = '';
    this.container.classList.remove('mt-2');
  }

  getCurrentNumber(totalPages: number) {
    let start = Math.max(1, this.currentPage - 2);
    const end = Math.min(totalPages, start + 4);
    start = Math.max(1, end - 4);
    return { start, end };
  }

  prevButton() {
    this.currentPage > 1 && this.button('Prev', this.currentPage - 1);
  }

  nextButton(totalPages: number) {
    const currentPage = this.currentPage;
    currentPage < totalPages && this.button('Next', currentPage + 1);
  }

  button(text: string, value: number) {
    this.container.insertAdjacentHTML(
      'beforeend',
      `<button class='btn' data-pagination='${value}'>${text}</button>`
    );
  }

  buttons(number: number) {
    this.container.insertAdjacentHTML(
      'beforeend',
      `<button class='btn btn--pagination' data-pagination='${number}'
      ${number === this.currentPage ? 'disabled' : ''}>${number}</button>`
    );
  }
}

export { Pagination };
