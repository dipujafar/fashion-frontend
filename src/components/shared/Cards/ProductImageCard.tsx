import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type TProps = {
  image: string;
};

const ProductImageCard = ({ data }: { data: TProps }) => {
  return (
    <div className="w-full  rounded   relative group">
      <Image
        src={data?.image}
        alt="cloth_image"
        width={1200}
        height={1200}
        className="mx-auto"
      ></Image>
      <div
        className={cn(
          "absolute bottom-[5%] right-[5%] md:size-8 rounded-full bg-primary-white shadow-2xl flex justify-center items-center hover:bg-primary-gray/20 duration-500 cursor-pointer"
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="31"
          height="32"
          viewBox="0 0 31 32"
          fill="none"
          className="group-hover:rotate-45 duration-500"
        >
          <path
            d="M21.2125 18.8202C21.0957 18.9454 20.9359 19.0245 20.7515 19.0245C20.3951 19.0245 20.1 18.7081 20.1 18.3257L20.1 11.0211L13.29 11.0211C12.9335 11.0211 12.6385 10.7046 12.6385 10.3223C12.6385 9.93989 12.9335 9.62345 13.29 9.62345L20.7515 9.62345C21.108 9.62345 21.403 9.93989 21.403 10.3223L21.403 18.3257C21.403 18.5235 21.3293 18.6949 21.2125 18.8202Z"
            fill="black"
          />
          <path
            d="M21.1099 10.9284L10.7657 22.0237C10.5137 22.294 10.0958 22.294 9.84378 22.0237C9.59179 21.7534 9.59179 21.3051 9.84378 21.0349L20.188 9.93947C20.44 9.66917 20.8579 9.66917 21.1099 9.93947C21.3619 10.2098 21.3619 10.6581 21.1099 10.9284Z"
            fill="black"
          />
        </svg>
      </div>
    </div>
  );
};

export default ProductImageCard;
