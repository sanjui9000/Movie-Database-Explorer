import React from "react";

import "./PaginationContainer.scss";

const PaginationContainer = ({ currentPage, totalPages, setPageNumber }) => {
  return (
    <div className="pagination_container">
      <div
        className={`button ${currentPage === 1 ? "disabled" : ""}`}
        onClick={() => setPageNumber(currentPage - 1)}
      >
        Previous
      </div>
      <div className="button page">{currentPage + " / " + totalPages}</div>
      <div
        className={`button ${currentPage === totalPages ? "disabled" : ""}`}
        onClick={() => setPageNumber(currentPage + 1)}
      >
        Next
      </div>
    </div>
  );
};

export default PaginationContainer;
