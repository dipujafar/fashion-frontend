import PageTopSection from "@/components/shared/PageTopSection";
import React from "react";
import VerifyOtpForm from "./_components/VerifyOtpForm";
export const metadata = {
  title: "Verify OTP",
  description: "Verify your account",
};

const VerifyOtpPage = () => {
  return (
    <div className="lg:space-y-12 space-y-7">
      <PageTopSection title="Please Verify Your Account"></PageTopSection>
      <VerifyOtpForm></VerifyOtpForm>
    </div>
  );
};

export default VerifyOtpPage;
