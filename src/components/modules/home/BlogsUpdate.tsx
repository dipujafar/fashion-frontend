import BlogCard from "@/components/shared/Cards/BlogCard";
import Container from "@/components/shared/Container";
import { blogsData } from "@/lib/dummyData.tsx";
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="15"
            viewBox="0 0 17 15"
            fill="none"
            className="group-hover:translate-x-2 duration-500 "
          >
            <path
              d="M15.75 7.67578L0.75 7.67578"
              stroke="black"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.69922 1.65217L15.7492 7.67617L9.69922 13.7012"
              stroke="black"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
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
