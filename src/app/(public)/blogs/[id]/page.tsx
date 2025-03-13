import Container from "@/components/shared/Container";
import React from "react";
import SingleBlogPageContainer from "./_components/SingleBlogPageContainer";

const page = () => {
  return (
    <Container>
      <h1 className="page-title text-center">Our Style Blog</h1>
      <SingleBlogPageContainer></SingleBlogPageContainer>
    </Container>
  );
};

export default page;
