"use client";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import { cn } from "@/lib/utils";
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";
import { Pagination } from "react-pagination-bar";

const PaginationSection = ({ className,
  total,
  current,
  pageSize
}: {
  className?: string,
  total: number;
  current: number;
  pageSize?: number
}) => {
  const updateParams = useUpdateSearchParams();
  return (
    <div className={cn("mt-10 text-end", className)}>
      {/* <Pagination
        currentPage={current}
        itemsPerPage={pageSize || 9}
        onPageChange={(pageNumber) => updateParams({ page: pageNumber.toString() })}
        totalItems={total}
        pageNeighbours={1}
      /> */}

      < Pagination
        currentPage={current}
        itemsPerPage={pageSize || 9}
        onPageChange={(pageNumber) => updateParams({ page: pageNumber.toString() })}
        totalItems={total}
        pageNeighbours={1}
        startLabel={<ChevronFirst className="size-4" />}
        prevLabel={<ChevronLeft className="size-4" />}
        nextLabel={<ChevronRight className="size-4" />}
        endLabel={<ChevronLast className="size-4" />}
        customClassNames={
          {
            rpbItemClassName: "rounded px-2.5 h-7 cursor-pointer border border-gray-200 ml-1.5 text-sm",
            rpbItemClassNameActive: "border-none bg-primary-black text-white",
          }
        }
      />

    </div>
  );
};

export default PaginationSection;
