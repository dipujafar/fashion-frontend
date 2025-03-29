import Container from "@/components/shared/Container";
import PageTopSection from "@/components/shared/PageTopSection";
import React from "react";
import UserRoleContainer from "./components/UserRoleContainer";

const SignUpPage = () => {
  return (
    <div className="lg:space-y-12 space-y-7">
      <PageTopSection title="Choose Your User Role"></PageTopSection>
      <Container className="lg:space-y-8 space-y-5">
        <h1 className="text-center text-lg md:text-3xl">
          Become a Fashion Philanthropist today!
        </h1>
        <UserRoleContainer></UserRoleContainer>
      </Container>
    </div>
  );
};

export default SignUpPage;
