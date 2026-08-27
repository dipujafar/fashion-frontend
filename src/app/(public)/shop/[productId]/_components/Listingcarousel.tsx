"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IProduct } from "@/types";
import ProductCard from "@/components/shared/Cards/ProductCard";

type PropType = {
    products: IProduct[];
    isOwner: boolean;
};

const Listingcarousel: React.FC<PropType> = ({ products, isOwner }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        containScroll: "trimSnaps",
        slidesToScroll: "auto",
    });

    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect).on("reInit", onSelect);
    }, [emblaApi, onSelect]);

    return (
        <div className="relative">
            <div className="embla__viewport overflow-hidden" ref={emblaRef}>
                <div className="embla__container flex gap-3">
                    {products?.map((product, index) => (
                        <div
                            key={product.id ?? index}
                            className="shrink-0 basis-1/2 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
                        >
                            <ProductCard ownProduct={isOwner} data={product} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Prev / Next buttons */}
            <button
                type="button"
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                aria-label="Previous products"
                className="absolute left-0 top-[38%] -translate-y-1/2 -translate-x-1/2 z-10 flex items-center justify-center h-8 w-8 rounded-full bg-white shadow-md border disabled:opacity-0 disabled:pointer-events-none transition cursor-pointer"
            >
                <ChevronLeft className="h-4 w-4 text-primary-black" />
            </button>
            <button
                type="button"
                onClick={scrollNext}
                disabled={!canScrollNext}
                aria-label="Next products"
                className="absolute right-0 top-[38%] -translate-y-1/2 translate-x-1/2 z-10 flex items-center justify-center h-8 w-8 rounded-full bg-white shadow-md border disabled:opacity-0 disabled:pointer-events-none transition cursor-pointer"
            >
                <ChevronRight className="h-4 w-4 text-primary-black" />
            </button>
        </div>
    );
};

export default Listingcarousel