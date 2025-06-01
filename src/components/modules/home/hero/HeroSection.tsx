import { TextAnimation } from "@/animations/TextAnimation";
import image1 from "@/assets/images/home/hero/hero_image1.png";
import image2 from "@/assets/images/home/hero/hero_image2.png";
import image3 from "@/assets/images/home/hero/hero_image3.png";
import { Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";

const userRoles = [
  {
    title: "INDIVIDUAL USER",
    id: "individual_user",
  },
  {
    title: "CELEBRITY",
    id: "celebrity",
  },
  {
    title: "PROFESSIONAL SELLER",
    id: "professional_seller",
  },
  {
    title: "ECO-FRIENDLY STORE",
    id: "eco_friendly_store",
  },
  {
    title: "CHARITABLE ORGANIZATION",
    id: "charitable_organization",
  },
  {
    title: "CHARITY STORE",
    id: "charity_store",
  },
  {
    title: "AMBASSADOR",
    id: "ambassador",
  },
  {
    title: "ASSISTED SELLER",
    id: "assisted_seller",
  },
];

const HeroSection = () => {
  return (
    <div className="md:-translate-y-5 -translate-y-4 overflow-x-hidden">
      <div className="grid grid-cols-5">
        <div className="col-span-3 relative">
          <Image src={image1} alt="hero image" className="w-full "></Image>
          <div
            className=" max-w-3xl absolute top-1/2 xl:-left-60 lg:-left-52 md:-left-40 sm:-left-36 -left-16 -translate-y-1/2  lg:px-28 lg:py-12 px-10 py-5 text-primary-white lg:text-5xl md:text-6xl text-xl font-semibold text-center w-full md:backdrop-blur-[7px] backdrop-blur-[4px] rotate-[270deg] rounded-lg flex justify-center items-center"
            style={{
              background: "rgba(217, 217, 217, 0.09)",
            }}
          >
            <TextAnimation
              reverse={true}
              text="Redefining Style"
              initialDelay={0.5}
              className="2xl:text-7xl xl:text-6xl lg:text-5xl md:text-4xl  font-bold"
            />
          </div>
        </div>
        <Image src={image2} alt="hero image" className="w-full"></Image>
        <Image src={image3} alt="hero image" className="w-full"></Image>
      </div>
      <Marquee className="bg-black">
        <div className="flex gap-x-3">
          {userRoles.map((user, index) => (
            <div
              key={index}
              className="text-primary-white md:text-2xl text-base font-bold uppercase bg-black flex items-center"
            >
              <Link href={`/user-details#${user?.id}`}>
                <span className="underline"> {user?.title} </span>{" "}
              </Link>
              <Dot className="md:size-10 size-5 text-[#E12728]" />
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default HeroSection;
