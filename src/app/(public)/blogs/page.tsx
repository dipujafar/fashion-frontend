import React from "react";
import BlogPageContainer from "./_components/BlogPageContainer";
import Container from "@/components/shared/Container";

const BlogPage = () => {
  return (
    <Container>
      <h1 className="page-title text-center">Our Style Blog</h1>
      <BlogPageContainer></BlogPageContainer>
    </Container>
  );
};

export default BlogPage;
