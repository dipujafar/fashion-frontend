"use client";
import BlogCard from "@/components/shared/Cards/BlogCard";
import PaginationSection from "@/components/shared/Pagination/PaginationSection";
import { blogsData } from "@/data/dummyData.tsx";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeUpVariants = {
  initial: {
    y: 50,
    opacity: 0,
    filter: "blur(5px)",
  },
  animate: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

const BlogPageContainer = () => {
  return (
    <div>
      {/* ============ All blogs ============== */}
      <motion.div
        initial="initial"
        whileInView="animate"
        variants={fadeUpVariants}
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 lg:gap-8 gap-4 xl:mt-8 mt-4"
      >
        {blogsData?.map((blog) => (
          <motion.div variants={fadeUpVariants} key={blog?._id}>
            <Link href={`/blogs/${blog?._id}`}>
              <BlogCard data={blog}></BlogCard>
            </Link>
          </motion.div>
        ))}
      </motion.div>
      {/* Pagination */}
      <PaginationSection></PaginationSection>
    </div>
  );
};

export default BlogPageContainer;
