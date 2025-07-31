"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

import Autoplay from "embla-carousel-autoplay";

const categories = [
  {
    _id: 1,
    label: "All",
    value: "all",
  },
  {
    _id: 2,
    label: "Top Selling",
    value: "top_selling",
  },
  {
    _id: 3,
    label: "Trending Item",
    value: "trending_item",
  },
  {
    _id: 4,
    label: "Jackets",
    value: "jackets",
  },
  {
    _id: 5,
    label: "Tops & Shirts",
    value: "tops_shirts",
  },
  {
    _id: 6,
    label: "Accessories",
    value: "accessories",
  },
];

const FeatureProductCategory = () => {
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
      className="overflow-hidden"
    >
      <CarouselContent>
        {categories?.slice(0, 8)?.map((category) => (
          <CarouselItem
            key={category?._id}
            className="basis-1/2 md:basis-1/4  lg:basis-1/6 xl:basis-1/8"
          >
            <div
              className={cn(
                "p-2  rounded w-full  flex justify-center bg-primary-gray/10 cursor-pointer truncate text-sm md:text-base",
                category?.value === "all" && "bg-primary-gray/90 text-primary-white"
              )}
            >
              {category?.label}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default FeatureProductCategory;
