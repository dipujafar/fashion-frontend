"use client";
import BlogCard from "@/components/shared/Cards/BlogCard";
import { blogsData } from "@/lib/dummyData.tsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pagination } from "react-pagination-bar";

const BlogPageContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const pagePostsLimit = 9;
  return (
    <div>
      {/* ============ All blogs ============== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 lg:gap-8 gap-4 xl:mt-8 mt-4">
        {blogsData?.map((blog) => (
          <Link key={blog?._id} href={`/blogs/${blog?._id}`}>
            <BlogCard data={blog}></BlogCard>
          </Link>
        ))}
      </div>
      {/* Pagination */}

      <div className="mt-10 text-end ">
        <Pagination
          currentPage={currentPage}
          itemsPerPage={pagePostsLimit}
          onPageChange={(pageNumber) => router.push(`?page=${pageNumber}`)}
          totalItems={30}
          pageNeighbours={1}
        />
      </div>
    </div>
  );
};

export default BlogPageContainer;
