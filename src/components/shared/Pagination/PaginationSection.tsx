"use client";
import { useState } from "react";
import { Pagination } from "react-pagination-bar";

const PaginationSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pagePostsLimit = 9;
  return (
    <div className="mt-10 text-end ">
      <Pagination
        currentPage={currentPage}
        itemsPerPage={pagePostsLimit}
        onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
        totalItems={30}
        pageNeighbours={1}
      />
    </div>
  );
};

export default PaginationSection;
