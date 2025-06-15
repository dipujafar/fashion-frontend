"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Pagination } from "react-pagination-bar";

const PaginationSection = ({className}: {className?: string}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pagePostsLimit = 9;
  return (
    <div className={cn("mt-10 text-end", className)}>
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
