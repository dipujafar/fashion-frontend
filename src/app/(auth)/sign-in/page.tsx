import SIgnInForm from "./components/SIgnInForm";

export const metadata = {
  title: "Sign In",
  description: "Sign In to your account and enjoy shopping",
};

const SignInPage = () => {
  return (
    <div className="lg:space-y-12 space-y-7">
      <SIgnInForm></SIgnInForm>
    </div>
  );
};

export default SignInPage;
