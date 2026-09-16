import image1 from "@/assets/images/home/hero/hero_image_4.png";
import image2 from "@/assets/images/home/hero/hero_image2.png";
import image3 from "@/assets/images/home/hero/hero_image3.png";
import { Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import PhilanthropistBox from "./PhilanthropistBox";

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

        <div className="flex xl:col-span-2 col-span-3 relative ">
          {/* <Image src={image4} alt="hero image" className="w-full md:h-[55vh] "></Image> */}
          <Image
            src={image1}
            alt="hero image"
            className="w-full h-[250px] md:h-[400px] lg:h-[500px] xl:h-[640px]  "
          ></Image>
          <div className="absolute lg:top-1/3 xl:left-1/3 lg:left-[40%] top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2  hidden md:block">
            <PhilanthropistBox />
          </div>
        </div>

        <div className="flex flex-row xl:col-span-3">
          <Image
            src={image2}
            alt="hero image"
            className="w-full h-[250px]md:h-[400px] lg:h-[500px] xl:h-[640px] object-cover "
          ></Image>
          <Image
            src={image3}
            alt="hero image"
            className="w-full h-[250px] md:h-[400px] lg:h-[500px] xl:h-[640px]  object-cover"
          ></Image>
        </div>

      </div>
      <Marquee
        className="bg-black"
        gradientColor={"#000"}
        gradient
        gradientWidth={150}
        speed={40}
      >
        <div className="flex gap-x-3">
          {userRoles?.map((user, index) => (
            <div
              key={index}
              className="text-primary-white lg:text-xl text-base font-bold uppercase bg-black flex items-center"
            >
              <Link href={`/user-details#${user?.id}`}>
                <span className=""> {user?.title} </span>{" "}
              </Link>
              <Dot className="md:size-10 size-5 text-white" />
            </div>
          ))}
        </div>
      </Marquee>
      <div className="md:hidden">
        <PhilanthropistBox
          className="text-black bg-black/10"
          btnClassName="border-black"
        />
      </div>
    </div>
  );
};

export default HeroSection;
