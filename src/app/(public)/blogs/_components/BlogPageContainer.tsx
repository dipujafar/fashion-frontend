import BlogCard from "@/components/shared/Cards/BlogCard";
import PaginationSection from "@/components/shared/Pagination/PaginationSection";
import { blogsData } from "@/data/dummyData.tsx";
import Link from "next/link";

const BlogPageContainer = () => {
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
      <PaginationSection></PaginationSection>
    </div>
  );
};

export default BlogPageContainer;
