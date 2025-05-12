import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import BlogCard from "@/components/shared/Cards/BlogCard";
import Container from "@/components/shared/Container";
import { blogsData } from "@/data/dummyData.tsx";
import Link from "next/link";

const BlogsUpdate = () => {
  return (
    <Container>
      <div className="flex justify-between items-center gap-x-4 mb-2 ">
        <h4 className="section-name">BLOG UPDATES</h4>
        <Link
          href={"/blogs"}
          className="flex gap-x-2 items-center font-bold group "
        >
          <p>VIEW ALL</p>
          <AnimatedArrow size={20}></AnimatedArrow>
        </Link>
      </div>
      <hr className=" border-primary-gray" />
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
