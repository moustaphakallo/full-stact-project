import React from "react";
export default function Pagination({
  page = 1,
  currentPage,
  pages,
  totalPages,
  onPageChange,
}) {
  const activePage = currentPage ?? page;
  const lastPage = totalPages ?? pages ?? 1;

  if (lastPage <= 1) {
    return null;
  }

  const changePage = (nextPage) => {
    if (nextPage >= 1 && nextPage <= lastPage) {
      onPageChange?.(nextPage);
    }
  };

  return (
    <nav className="pagination" aria-label="Pagination">
      <button type="button" disabled={activePage <= 1} onClick={() => changePage(activePage - 1)}>
        Précédent
      </button>
      <span>Page {activePage} / {lastPage}</span>
      <button type="button" disabled={activePage >= lastPage} onClick={() => changePage(activePage + 1)}>
        Suivant
      </button>
    </nav>
  );
}