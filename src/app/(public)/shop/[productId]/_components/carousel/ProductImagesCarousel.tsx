import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import "./carousel.css";
import Image from "next/image";
import { TProductImage } from "@/types";
import { CarouselThumbs } from "./CarouselThumbs";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

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
              <Zoom>
                <Image
                  src={data?.url}
                  width={500}
                  height={500}
                  alt="product_image"
                  quality={100}
                  className=" h-[750px] object-contain w-full md:max-h-[calc(100vh-350px)] mx-auto"
                ></Image>
              </Zoom>
            </div>
          ))}
        </div>
      </div>

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container  gap-2 grid grid-cols-4 mt-2">
            {slides?.slice(0, 6)?.map((data, index) => (
              <CarouselThumbs
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
                data={data}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImagesCarousel;
