import './Pagination.scss';

class Pagination {
  totalPages: number;
  currentPage = 1;
  pagination: HTMLDivElement = this.getPaginationWrapper();

  constructor(totalPages: number) {
    this.totalPages = totalPages;
  }

  getPaginationWrapper() {
    return document.getElementById('pagination') as HTMLDivElement;
  }

  createPaginationWrapper(element: HTMLDivElement) {
    if (this.getPaginationWrapper()) return;
    element.insertAdjacentHTML(
      'afterend',
      `<div class="pagination mt-2" id="pagination"></div>`
    );
    this.pagination = this.getPaginationWrapper();
  }

  show(currentPage: number = 1) {
    this.pagination.innerHTML = '';
    this.currentPage = currentPage;
    const { start, end } = this.getCurrentNumber();
    this.prevButton();
    for (let btn = start; btn <= end; btn++) this.buttons(btn);
    this.nextButton();
  }

  getCurrentNumber() {
    let start = Math.max(1, this.currentPage - 2);
    const end = Math.min(this.totalPages, start + 4);
    start = Math.max(1, end - 4);
    return { start, end };
  }

  prevButton() {
    this.currentPage > 1 && this.button('Prev', this.currentPage - 1);
  }

  nextButton() {
    const currentPage = this.currentPage;
    currentPage < this.totalPages && this.button('Next', currentPage + 1);
  }

  button(text: string, value: number) {
    this.pagination.insertAdjacentHTML(
      'beforeend',
      `<button class="btn" data-pagination='${value}'>${text}</button>`
    );
  }

  buttons(number: number) {
    this.pagination.insertAdjacentHTML(
      'beforeend',
      `<button class="btn btn--pagination" data-pagination="${number}"
      ${number === this.currentPage ? 'disabled' : ''}>${number}</button>`
    );
  }
}

export { Pagination };
