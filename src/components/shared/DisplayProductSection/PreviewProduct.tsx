"use client";
import ProductImageCard from "@/components/shared/Cards/ProductImageCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { IProduct } from "@/types";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

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
      className="overflow-hidden xl:mt-8  md:mt-6 mt-4"
    >
      <CarouselContent>
        {productData?.slice(0, 8)?.map((data) => (
          <CarouselItem
            key={data?.id}
            className="basis-1/2  md:basis-1/3 xl:basis-1/5 "
          >
            <Link href={`/shop/${data?.id}`}>
              <ProductImageCard data={{ image: data?.images[0]?.url }} />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default PreviewProduct;
