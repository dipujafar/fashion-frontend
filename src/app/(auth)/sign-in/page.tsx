import PageTopSection from "@/components/shared/PageTopSection";
import Image from "next/image";
import SIgnInForm from "./components/SIgnInForm";

const SignInPage = () => {
  return (
    <div className="lg:space-y-12 space-y-7">
      <PageTopSection title="Welcome Back! Log In to Continue"></PageTopSection>
      <SIgnInForm></SIgnInForm>
    </div>
  );
};

export default SignInPage;
