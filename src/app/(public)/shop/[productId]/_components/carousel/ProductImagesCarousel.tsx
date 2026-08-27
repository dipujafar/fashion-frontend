import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import "./carousel.css";
import Image from "next/image";
import { CarouselThumbs } from "./CarouselThumbs";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { IProduct } from "@/types";
import { defaultImg } from "@/utils/defaultImg";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PropType = {
  product: IProduct;
  options?: any;
};

const ProductImagesCarousel: React.FC<PropType> = ({ product, options }) => {
  const { images: slides } = product;
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);

  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
    slidesToScroll: 1,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const [thumbsCanPrev, setThumbsCanPrev] = useState(false);
  const [thumbsCanNext, setThumbsCanNext] = useState(false);

  // ----- Main carousel controls -----
  const scrollPrev = useCallback(() => {
    emblaMainApi?.scrollPrev();
  }, [emblaMainApi]);

  const scrollNext = useCallback(() => {
    emblaMainApi?.scrollNext();
  }, [emblaMainApi]);

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
    setCanScrollPrev(emblaMainApi.canScrollPrev());
    setCanScrollNext(emblaMainApi.canScrollNext());
  }, [emblaMainApi, emblaThumbsApi]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  // ----- Thumbs carousel controls -----
  const scrollThumbsPrev = useCallback(() => {
    emblaThumbsApi?.scrollPrev();
  }, [emblaThumbsApi]);

  const scrollThumbsNext = useCallback(() => {
    emblaThumbsApi?.scrollNext();
  }, [emblaThumbsApi]);

  const onThumbsSelect = useCallback(() => {
    if (!emblaThumbsApi) return;
    setThumbsCanPrev(emblaThumbsApi.canScrollPrev());
    setThumbsCanNext(emblaThumbsApi.canScrollNext());
  }, [emblaThumbsApi]);

  useEffect(() => {
    if (!emblaThumbsApi) return;
    onThumbsSelect();
    emblaThumbsApi
      .on("select", onThumbsSelect)
      .on("reInit", onThumbsSelect);
  }, [emblaThumbsApi, onThumbsSelect]);

  return (
    <div className="embla">
      {/* Main image carousel */}
      <div className="embla relative">
        <div className="embla__viewport h-fit" ref={emblaMainRef}>
          <div className="embla__container">
            {slides?.map((data, index) => (
              <div className="embla__slide rounded" key={index}>
                <div className="">
                  <Zoom>
                    <div className="relative h-100 md:h-[750px] lg:h-[430px] xl:h-[520px] 2xl:h-[700px] w-full">
                      <Image
                        src={data?.url || defaultImg?.product}
                        fill
                        placeholder="blur"
                        blurDataURL={defaultImg.placeholderImg}
                        alt="product_image"
                        quality={100}
                        className="object-cover h-full w-full mx-auto"
                      ></Image>
                    </div>
                  </Zoom>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prev / Next buttons on main image */}
        <button
          type="button"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          aria-label="Previous image"
          className="cursor-pointer absolute left-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center h-9 w-9 rounded-full bg-white/80 hover:bg-white shadow disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft className="h-5 w-5 text-primary-black" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          disabled={!canScrollNext}
          aria-label="Next image"
          className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center h-9 w-9 rounded-full bg-white/80 hover:bg-white shadow disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          <ChevronRight className="h-5 w-5 text-primary-black" />
        </button>
      </div>

      {/* Thumbnails carousel */}
      <div className="embla-thumbs relative mt-2">
        {/* prev arrow */}
        {thumbsCanPrev && (
          <button
            type="button"
            onClick={scrollThumbsPrev}
            aria-label="Previous thumbnails"
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center h-7 w-7 rounded-full bg-white shadow border cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4 text-primary-black" />
          </button>
        )}

        <div className="embla-thumbs__viewport overflow-hidden" ref={emblaThumbsRef}>
          {/* desktop/large: 5 visible at a time */}
          <div className="embla-thumbs__container flex gap-2">
            {slides?.map((data, index) => (
              <div
                key={index}
                className="shrink-0 basis-1/5 md:basis-1/6 lg:basis-1/5 xl:basis-1/6"
              >
                <CarouselThumbs
                  onClick={() => onThumbClick(index)}
                  selected={index === selectedIndex}
                  index={index}
                  data={data}
                />
              </div>
            ))}
          </div>

        </div>

        {/* next arrow */}
        {thumbsCanNext && (
          <button
            type="button"
            onClick={scrollThumbsNext}
            aria-label="Next thumbnails"
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center h-7 w-7 rounded-full bg-white shadow border cursor-pointer"
          >
            <ChevronRight className="h-4 w-4 text-primary-black" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductImagesCarousel;