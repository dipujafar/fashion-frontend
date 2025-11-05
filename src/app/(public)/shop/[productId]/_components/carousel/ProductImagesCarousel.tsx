import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import "./carousel.css";
import Image from "next/image";
import { TProductImage } from "@/types";
import { CarouselThumbs } from "./CarouselThumbs";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Heart } from "lucide-react";

type PropType = {
  slides: TProductImage[];
  options?: any;
};

const ProductImagesCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="embla">
      <div className="embla__viewport h-fit   " ref={emblaMainRef}>
        <div className="embla__container  ">
          {slides?.slice(0, 6)?.map((data, index) => (
            <div className="embla__slide rounded" key={index}>
              <div className="relative md:h-[750px] h-[400px] md:max-h-[calc(100vh-350px)] ">
                <Zoom>
                  <Image
                    src={data?.url}
                    width={500}
                    height={500}
                    alt="product_image"
                    quality={100}
                    className="   object-cover w-full md:h-[750px] h-[400px] md:max-h-[calc(100vh-350px)] mx-auto"
                  ></Image>
                </Zoom>
                {/* ===================== favorite button ================ */}
                <div className="bg-primary-black absolute bottom-2 right-2 h-5 md:h-7 w-[50px] md:w-16 flex justify-center items-center gap-x-1 rounded-full cursor-pointer group duration-500 md:text-base text-sm text-white ">
                  <Heart className="group-hover:fill-primary-red text-primary-red duration-500 md:size-[18px] size-4"></Heart>
                  <p>12</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container  gap-2 lg:grid grid-cols-4 mt-2 hidden ">
            {slides?.slice(0, 8)?.map((data, index) => (
              <CarouselThumbs
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
                data={data}
              />
            ))}
          </div>
          {/* for small screen*/}
          <div className="embla-thumbs__container  gap-2 grid grid-cols-4 mt-2 lg:hidden ">
            {slides?.slice(0, 3)?.map((data, index) => (
              <CarouselThumbs
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
                data={data}
              />
            ))}
            <div className="relative">
              {slides?.slice(3, 4)?.map((data, index) => (
                <CarouselThumbs
                  key={index}
                  onClick={() => onThumbClick(index)}
                  selected={index === selectedIndex}
                  index={index}
                  data={data}
                />
              ))}
              <div className="absolute inset-0 bg-primary-black/50">
              {slides?.length - 1 > 3 && <span className="text-white text-sm font-semibold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">+{slides?.length - 3}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImagesCarousel;
