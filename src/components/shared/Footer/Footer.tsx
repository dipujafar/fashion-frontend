import logo from "@/assets/images/common-image/logo.png";
import Container from "../Container";
import Image from "next/image";
import SocialMedia from "./SocialMedia";
import QuickLinks from "./QuickLinks";

const Footer = () => {
  return (
    <Container>
      <div
        style={{ boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.06)" }}
        className="bg-primary-white lg:py-8 py-5 flex flex-col justify-center items-center  gap-y-4 rounded-2xl px-5 shadow-xl"
      >
        <Image src={logo} alt="logo"></Image>
        <p className="md:text-center lg:text-xl text-black/70 ">
          FASHI-ON, we bring you a curated collection of secondhand and
          eco-friendly fashion, allowing you to shop sustainably and support
          charitable causes. Whether you're buying, selling, or donating, every
          choice you make with us contributes to a more responsible and stylish
          world.
        </p>
        <SocialMedia></SocialMedia>
        <QuickLinks></QuickLinks>
      </div>
    </Container>
  );
};

export default Footer;
