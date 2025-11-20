import React from "react";
import BlogPageContainer from "./_components/BlogPageContainer";
import Container from "@/components/shared/Container";

export const metadata = {
  title: "Blogs",
  description: "ALL styles blog will find here",
};

const BlogPage = () => {
  return (
    <Container>
      <h1 className="page-title text-center pt-5">Our Style Blog</h1>
      <BlogPageContainer></BlogPageContainer>
    </Container>
  );
};

export default BlogPage;
