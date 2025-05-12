"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const feedbackData = [
  {
    _id: 1,
    userImage: "/user1.png",
    userName: " San Francisco ",
    comment:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and ",
  },
  {
    _id: 2,
    userImage: "/user2.png",
    userName: "Dr. Marina Califer",
    comment:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and ",
  },
  {
    _id: 3,
    userImage: "/user3.png",
    userName: "Nichol Smith",
    comment:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and ",
  },
  {
    _id: 4,
    userImage: "/user2.png",
    userName: "Dr. Marina Califer",
    comment:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and ",
  },
  {
    _id: 5,
    userImage: "/user3.png",
    userName: "Nichol Smith",
    comment:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and ",
  },
  {
    _id: 6,
    userImage: "/user1.png",
    userName: "Dr. Marina Califer",
    comment:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and ",
  },
];

const FeedbacksCarousel = () => {
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
      className="xl:mt-8  md:mt-6 mt-4"
    >
      <CarouselContent>
        {feedbackData?.slice(0, 8)?.map((data) => (
          <CarouselItem
            key={data?._id}
            className=" md:basis-1/2  lg:basis-1/3 2xl:basis-1/4 "
          >
            <Card className="border-none">
              <CardContent className="space-y-3 text-center">
                <p className="xl:text-base md:text-sm">{data?.comment}</p>
                <hr />
                <div className="space-y-1 ">
                  <h5 className="text-xl">{data?.userName}</h5>
                  <Image
                    src={data?.userImage}
                    alt="user_image"
                    width={1200}
                    height={1200}
                    className="size-14 mx-auto"
                  ></Image>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute xl:-top-14 md:-top-12 -top-10 right-0 flex ">
        <CarouselPrevious className="-left-18 bg-transparent border-primary-black  hover:bg-primary-black duration-300 hover:text-primary-white " />
        <CarouselNext className="-right-0 bg-transparent border-primary-black hover:bg-primary-black duration-300 hover:text-primary-white " />
      </div>
    </Carousel>
  );
};

export default FeedbacksCarousel;
