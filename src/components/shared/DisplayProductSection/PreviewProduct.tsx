"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IProduct } from "@/types";
import Autoplay from "embla-carousel-autoplay";
import PProductCard from "../Cards/PProductCard";

const PreviewProduct = ({ productData }: { productData: IProduct[] }) => {
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
    // className="overflow-hidden"
    >
      <CarouselContent>
        {productData?.slice(0, 8)?.map((data) => (
          <CarouselItem
            key={data?.id}
            // grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4
            className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6"
          >
            <PProductCard data={data}></PProductCard>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-1 z-10" />
      <CarouselNext className="right-1 z-10" />
    </Carousel>
  );
};

export default PreviewProduct;
