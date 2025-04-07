import PageTopSection from "@/components/shared/PageTopSection";
import React from "react";
import SignUpForm from "./_components/SignUpForm";

const SignUp = () => {
  return (
    <div className="lg:space-y-12 space-y-7">
      <PageTopSection title="Join As a Individual User"></PageTopSection>
      <SignUpForm></SignUpForm>
    </div>
  );
};

export default SignUp;
