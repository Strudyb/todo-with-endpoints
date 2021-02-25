import React from "react";

function Pagination({ postPerPage, totalPosts, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination">
      <div className="container">
        <ul>
          {pageNumbers.map((number) => (
            <li key={number}>
              <a
                href="!#"
                onClick={(e) => paginate(e, number)}
                className={currentPage === number ? "active" : null}
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Pagination;
