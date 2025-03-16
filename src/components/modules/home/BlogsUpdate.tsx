import BlogCard from "@/components/shared/Cards/BlogCard";
import Container from "@/components/shared/Container";
import { blogsData } from "@/lib/dummyData.tsx";
import { MoveRight } from "lucide-react";
import Link from "next/link";

const BlogsUpdate = () => {
  return (
    <Container>
      <div className="flex justify-between items-center gap-x-4 mb-2">
        <h4>BLOG UPDATES</h4>
        <div className="flex gap-x-1">
          <p>VIEW ALL</p>
          <MoveRight></MoveRight>
        </div>
      </div>
      <hr />
      {/* update blogs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 lg:gap-8 gap-4 xl:mt-8 mt-4">
        {blogsData?.slice(0, 4)?.map((blog) => (
          <Link key={blog?._id} href={`/blogs/${blog?._id}`}>
            <BlogCard data={blog}></BlogCard>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default BlogsUpdate;
