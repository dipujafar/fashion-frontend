import BlogCard from "@/components/shared/Cards/BlogCard";
import { blogsData } from "@/lib/dummyData.tsx";
import Link from "next/link";
import React from "react";

const RelatedBlog = () => {
  return (
    <div className="xl:space-y-10 space-y-5">
      <h1 className="section-title">Latest Related Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 lg:gap-8 gap-4 xl:mt-8 mt-4">
        {blogsData?.slice(0, 4)?.map((blog) => (
          <Link key={blog?._id} href={`/blogs/${blog?._id}`}>
            <BlogCard data={blog}></BlogCard>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedBlog;
