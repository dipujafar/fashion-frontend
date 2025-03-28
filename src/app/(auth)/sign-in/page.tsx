import bgImage from "@/assets/images/auth/auth_pages_top_image.png";
import Image from "next/image";

const SignInPage = () => {
  return (
    <div className="max-h-[240px] relative">
      <Image
        src={bgImage}
        alt="bg_image"
        className="max-h-[240px] object-cover"
      ></Image>
    </div>
  );
};

export default SignInPage;
