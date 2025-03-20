"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";

const clothesData = [
  {
    _id: 1,
    image: "/clothes1.png",
  },
  {
    _id: 2,
    image: "/clothes2.png",
  },
  {
    _id: 3,
    image: "/clothes3.png",
  },
  {
    _id: 4,
    image: "/clothes4.png",
  },
  {
    _id: 5,
    image: "/clothes3.png",
  },
  {
    _id: 6,
    image: "/clothes2.png",
  },
  {
    _id: 7,
    image: "/clothes1.png",
  },
];

const PreviewClothes = () => {
  return (
    <Carousel
      opts={{
        loop: true,
        duration: 60,
        align: "start",
      }}
      plugins={[
        Autoplay({
          delay: 4000,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
        }),
      ]}
      className="overflow-hidden xl:mt-8  md:mt-6 mt-4"
    >
      <CarouselContent>
        {clothesData?.slice(0, 8)?.map((data) => (
          <CarouselItem
            key={data?._id}
            className="  md:basis-1/2  lg:basis-1/3 2xl:basis-1/4 "
          >
            <Link href={`/shop/${1}`}>
              <div className="w-full bg-primary-gray/10 rounded 2xl:py-14 xl:py-10 py-6 px-8 relative group">
                <Image
                  src={data?.image}
                  alt="cloth_image"
                  width={1200}
                  height={1200}
                  className="h-[300px] w-auto mx-auto"
                ></Image>
                <div className="absolute bottom-[5%] right-[5%] size-9 rounded-full bg-primary-white shadow-2xl flex justify-center items-center hover:bg-primary-gray/20 duration-500 cursor-pointer ">
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
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default PreviewClothes;
