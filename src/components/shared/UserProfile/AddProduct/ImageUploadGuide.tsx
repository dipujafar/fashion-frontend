"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CaptureIcon } from "@/icons";
import Image from "next/image";
import correctImage from "@/assets/icons/rightIcon.png";
import incorrectImage from "@/assets/icons/wrongIcon.png";

const slides = [
  {
    title: "Take Clear Photos ",
    images: ["/uploadGuildImage1.png"],
    correctGuide: [
      "Use natural light (bright daylight is best). ",
      "Use a neutral background (plain wall, uncluttered space).",
    ],
    inCorrectGuide: [
      "Don’t use flash — it distorts colours.",
      "Don’t use dark rooms or messy backgrounds. ",
    ],
  },
  {
    title: "Show All Angles",
    images: ["/uploadGuildImage2.png", "/uploadGuildImage3.png"],
    correctGuide: [
      "Front view of the item",
      "Back view of the item ",
      "Side view(s) if relevant",
      "Close-up of labels (brand, size, fabric, care) ",
      "Any defects (scratches, stains, wear & tear) ",
      "Receipts or authenticity documents (if available) ",
    ],
    inCorrectGuide: [],
  },
  {
    title: "Highlight Item Details",
    correctGuide: [
      "Take multiple angles so buyers see exactly what they’ll receive.",
      "Show unique details (buttons, zips, stitching, packaging).",
      "Always be honest and show imperfections clearly.",
    ],
    inCorrectGuide: [],
  },
  {
    title: "Use Only Your Own Photos",
    correctGuide: ["Take photos yourself or ask a friend."],
    inCorrectGuide: ["Don’t upload stock, catalog, or copyrighted images."],
  },
];

export function ImageUploadGuide() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const canScrollPrev = current > 0;
  const canScrollNext = current < count - 1;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="bg-black/80 py-1 px-2 rounded text-white flex gap-x-2 cursor-pointer">
          <CaptureIcon />
          <p className="text-sm md:text-base">
            Grab your buyers’ attention - highlight your products with great
            photos.{" "}
            <span className="underline ml-1 font-medium text-green-400">
              Upload Guide
            </span>
          </p>
        </div>
      </DialogTrigger>
      <DialogContent className="!max-w-2xl p-0 gap-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-xl font-semibold  ">
            {slides[current]?.title}
          </DialogTitle>
        </DialogHeader>

        <Carousel setApi={setApi} className="md:!max-w-2xl max-w-[350px]">
          <CarouselContent className="h-fit">
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="px-6 space-y-1.5">
                  {slide?.images?.map((image) => (
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${slide.title} image`}
                      width={500}
                      height={200}
                      className=" object-cover w-[375px] md:w-auto h-auto"
                    />
                  ))}
                  {/* guidance */}
                  <div className="flex gap-2 my-3">
                    <div className="flex-1 flex flex-col gap-1">
                      {slide?.correctGuide.map((guide, index) => (
                        <div key={index} className="flex gap-1.5">
                          <div className="justify-start flex-shrink-0">
                            <Image
                              src={correctImage}
                              alt="correct guidance"
                              width={20}
                              height={20}
                              className=""
                            />
                          </div>
                          <p>{guide}</p>
                        </div>
                      ))}
                    </div>
                    {slide?.inCorrectGuide?.length > 0 && (
                      <div className="flex-1 flex flex-col gap-1.5 ">
                        {slide?.inCorrectGuide.map((guide, index) => (
                          <div key={index} className="flex gap-1">
                            <div className="justify-start flex-shrink-0">
                              <Image
                                src={incorrectImage}
                                alt="incorrect guidance"
                                width={20}
                                height={20}
                                className=""
                              />
                            </div>
                            <p>{guide}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="flex items-center justify-between border-t px-6 py-4 w-[350px] md:w-auto">
          <Button
            variant="outline"
            onClick={() => api?.scrollPrev()}
            disabled={!canScrollPrev}
          >
            Previous
          </Button>

          <div className="flex gap-1.5">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "size-2 rounded-full transition-all",
                  current === index
                    ? "bg-cyan-500 w-6"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <Button
            onClick={() => api?.scrollNext()}
            disabled={!canScrollNext}
            className="bg-cyan-500 hover:bg-cyan-600 text-white"
          >
            Next
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
