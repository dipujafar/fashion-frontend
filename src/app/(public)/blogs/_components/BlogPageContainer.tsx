"use client";
import BlogCard from "@/components/shared/Cards/BlogCard";
import Container from "@/components/shared/Container";
import { blogsData } from "@/lib/dummyData.tsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pagination } from "react-pagination-bar";

const BlogPageContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const pagePostsLimit = 9;
  return (
    <Container>
      <h1 className="page-title text-center">Our Style Blog</h1>
      {/* ============ All blogs ============== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 lg:gap-8 gap-4 xl:mt-8 mt-4">
        {blogsData?.map((blog) => (
          <BlogCard data={blog} key={blog?._id}></BlogCard>
        ))}
      </div>
      {/* Pagination */}

      <div className="mt-10 text-end  ">
        <Pagination
          currentPage={currentPage}
          itemsPerPage={pagePostsLimit}
          onPageChange={(pageNumber) => router.push(`?page=${pageNumber}`)}
          totalItems={30}
          pageNeighbours={1}
        />
      </div>
    </Container>
  );
};

export default BlogPageContainer;
