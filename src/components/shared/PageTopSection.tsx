import Image from "next/image";
import React from "react";
import bgImage from "@/assets/images/auth/auth_pages_top_image.png";

const PageTopSection = ({ title }: { title: string }) => {
  return (
    <div className="max-h-[240px] relative">
      <Image
        src={bgImage}
        alt="bg_image"
        className="max-h-[240px] object-cover"
      ></Image>
      <div
        className="max-w-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:px-16 lg:py-12 px-10 py-8 text-primary-white lg:text-5xl text-3xl font-semibold text-center w-full md:backdrop-blur-[7px] backdrop-blur-[4px]"
        style={{
          background: "rgba(217, 217, 217, 0.09)",
        }}
      >
        <h1>{title}</h1>
      </div>
    </div>
  );
};

export default PageTopSection;
