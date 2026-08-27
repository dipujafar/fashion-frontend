import Container from "@/components/shared/Container";
import React from "react";
import UserRoleContainer from "./components/UserRoleContainer";

const SignUpPage = () => {
  return (
    <div className="lg:space-y-12 space-y-7">
      <Container className="lg:space-y-8 space-y-5 pt-5 lg:pt-8">
        <h1 className="text-center text-lg md:text-3xl font-medium text-gray-900 lg:leading-[3rem]">
          Join the Fashion Philanthropist Community!
        </h1>
        <UserRoleContainer></UserRoleContainer>
      </Container>
    </div>
  );
};

export default SignUpPage;
