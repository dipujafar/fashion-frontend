"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
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
import Image from "next/image";
import { Camera, Check, X, ChevronLeft, ChevronRight, Sparkles, ShieldCheck } from "lucide-react";

const slides = [
  {
    title: "Take Clear Photos",
    images: ["/uploadGuildImage1.png"],
    correctGuide: [
      "Use natural light (bright daylight is best).",
      "Use a neutral background (plain wall, uncluttered space).",
    ],
    inCorrectGuide: [
      "Don’t use flash — it distorts colours.",
      "Don’t use dark rooms or messy backgrounds.",
    ],
  },
  {
    title: "Show All Angles",
    images: ["/uploadGuildImage2.png"],
    correctGuide: [
      "Front view of the item",
      "Back view of the item",
      "Side view(s) if relevant",
      "Close-up of labels (brand, size, fabric, care)",
      "Any defects (scratches, stains, wear & tear)",
      "Receipts or authenticity documents (if available)",
    ],
    inCorrectGuide: [],
  },
  {
    title: "Highlight Item Details",
    images: [],
    correctGuide: [
      "Take multiple angles so buyers see exactly what they’ll receive.",
      "Show unique details (buttons, zips, stitching, packaging).",
      "Always be honest and show imperfections clearly.",
    ],
    inCorrectGuide: [],
  },
  {
    title: "Use Only Your Own Photos",
    images: [],
    correctGuide: ["Take photos yourself or ask a friend."],
    inCorrectGuide: ["Don’t upload stock, catalog, or copyrighted images."],
  },
];

export function ImageUploadGuide() {
  const [open, setOpen] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(slides.length);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const canScrollPrev = current > 0;
  const isLast = current === count - 1;

  const handleNext = () => {
    if (isLast) {
      setOpen(false);
    } else {
      api?.scrollNext();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger Button - Refined Minimalist Badge */}
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-300 bg-neutral-900 hover:bg-neutral-900/80 text-white text-xs md:text-sm font-medium transition-all duration-200 shadow-xs cursor-pointer group"
        >
          <Camera className="size-4 text-white transition-colors" />
          <span>Upload Guide</span>
        </button>
      </DialogTrigger>

      {/* Modal Dialog Content
          - flex column + max-h keeps the dialog inside the viewport
          - min-w-0 / overflow-hidden stop inner content from widening the dialog */}
      <DialogContent className="flex flex-col w-full min-w-0 max-w-[calc(100%-2rem)] sm:max-w-lg md:max-w-2xl max-h-[90dvh] p-0 gap-0 overflow-hidden bg-white border border-neutral-200">
        {/* Modal Header */}
        <div className="shrink-0 pl-6 pr-14 pt-5 pb-4 border-b border-neutral-100 bg-white">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
            Photo Guidelines
          </span>
          <DialogTitle asChild>
            <h2 className="text-lg md:text-xl font-bold text-neutral-900 tracking-tight mt-0.5 text-left">
              {slides[current]?.title}
            </h2>
          </DialogTitle>
        </div>

        {/* Carousel Content */}
        <Carousel setApi={setApi} className="w-full min-w-0 min-h-0">
          <CarouselContent className="items-start m-0">
            {slides.map((slide, index) => {
              const hasImages = slide.images && slide.images.length > 0;
              const hasIncorrect = slide.inCorrectGuide && slide.inCorrectGuide.length > 0;

              return (
                <CarouselItem key={index} className="p-0 min-w-0">
                  {/* Each slide scrolls vertically on its own.
                      160px = header (~76px) + footer (~66px) + small buffer. */}
                  <div className="w-full min-w-0 box-border px-6 py-5 space-y-4 max-h-[calc(90dvh-160px)] overflow-y-auto overflow-x-hidden overscroll-contain">
                    {/* Visual Anchor Area - Full Uncropped Image */}
                    {hasImages ? (
                      <div className="w-full rounded-xl p-1">
                        <Image
                          src={slide.images[0]}
                          alt={`${slide.title} example`}
                          width={1000}
                          height={500}
                          className="w-full max-w-96 h-auto max-h-[200px] md:max-h-[320px] object-contain rounded-lg"
                          priority={index === 0}
                        />
                      </div>
                    ) : index === 2 ? (
                      /* Aesthetic visual banner for Slide 3 */
                      <div className="relative w-full h-32 sm:h-36 rounded-xl overflow-hidden bg-neutral-950 text-white p-5 flex flex-col justify-between shadow-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                            Buyer Confidence
                          </span>
                          <Sparkles className="size-5 text-neutral-300" />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                            Highlight Quality & Craftsmanship
                          </h3>
                          <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                            Show unique textures, tags, and hardware to give buyers certainty.
                          </p>
                        </div>
                      </div>
                    ) : (
                      /* Aesthetic visual banner for Slide 4 */
                      <div className="relative w-full h-32 sm:h-36 rounded-xl overflow-hidden bg-neutral-950 text-white p-5 flex flex-col justify-between shadow-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                            Transparency & Trust
                          </span>
                          <ShieldCheck className="size-5 text-neutral-300" />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                            Authentic Original Photos
                          </h3>
                          <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                            Real, unedited photos in your own space protect your seller reputation.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Guidance Content Area */}
                    {hasIncorrect ? (
                      /* Side-by-side Do & Don't layout */
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1 min-w-0">
                        {/* Do Section */}
                        <div className="min-w-0 p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-3">
                          <div className="flex items-center gap-2 pb-1.5 border-b border-neutral-200">
                            <span className="size-5 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                              <Check className="size-3" strokeWidth={3} />
                            </span>
                            <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                              Do
                            </span>
                          </div>
                          <ul className="space-y-2.5">
                            {slide.correctGuide.map((guide, gIdx) => (
                              <li key={gIdx} className="flex items-start gap-2.5">
                                <span className="size-1.5 rounded-full bg-neutral-900 mt-2 shrink-0" />
                                <span className="min-w-0 text-sm md:text-base font-medium text-neutral-800 leading-snug break-words">
                                  {guide}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Don't Section */}
                        <div className="min-w-0 p-4 rounded-xl bg-neutral-50/60 border border-neutral-200/80 space-y-3">
                          <div className="flex items-center gap-2 pb-1.5 border-b border-neutral-200">
                            <span className="size-5 rounded-full bg-neutral-200 text-neutral-800 flex items-center justify-center shrink-0">
                              <X className="size-3" strokeWidth={3} />
                            </span>
                            <span className="text-xs font-bold uppercase tracking-wider text-neutral-600">
                              Don’t
                            </span>
                          </div>
                          <ul className="space-y-2.5">
                            {slide.inCorrectGuide.map((guide, gIdx) => (
                              <li key={gIdx} className="flex items-start gap-2.5">
                                <span className="size-1.5 rounded-full bg-neutral-400 mt-2 shrink-0" />
                                <span className="min-w-0 text-sm md:text-base font-medium text-neutral-700 leading-snug break-words">
                                  {guide}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : index === 1 ? (
                      /* Slide 2: 2-column checklist layout for all 6 angles */
                      <div className="pt-1 min-w-0">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {slide.correctGuide.map((guide, gIdx) => (
                            <div
                              key={gIdx}
                              className="min-w-0 flex items-center gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-200/80 shadow-2xs"
                            >
                              <span className="size-5 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                                <Check className="size-3" strokeWidth={3} />
                              </span>
                              <span className="min-w-0 text-sm md:text-[15px] font-medium text-neutral-800 leading-snug break-words">
                                {guide}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      /* Slide 3: Spacious rows for details */
                      <div className="space-y-2.5 pt-1 min-w-0">
                        {slide.correctGuide.map((guide, gIdx) => (
                          <div
                            key={gIdx}
                            className="min-w-0 flex items-start gap-3.5 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80"
                          >
                            <span className="size-5 rounded-full bg-black text-white flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="size-3" strokeWidth={3} />
                            </span>
                            <span className="min-w-0 text-sm md:text-base font-medium text-neutral-800 leading-snug break-words">
                              {guide}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>

        {/* Modal Navigation Footer */}
        <div className="shrink-0 flex items-center justify-between gap-2 border-t border-neutral-200 px-6 py-4 bg-neutral-50/50">
          {/* Previous Button */}
          <Button
            type="button"
            variant="outline"
            onClick={() => api?.scrollPrev()}
            disabled={!canScrollPrev}
            className="border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-900 text-xs md:text-sm font-medium h-9 px-4 cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronLeft className="size-4 mr-1" />
            Previous
          </Button>

          {/* Pagination Indicators */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                  current === index
                    ? "bg-neutral-900 w-6"
                    : "bg-neutral-300 w-1.5 hover:bg-neutral-400"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next / Got it Button */}
          <Button
            type="button"
            onClick={handleNext}
            className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs md:text-sm font-medium h-9 px-5 cursor-pointer transition-colors"
          >
            <span>{isLast ? "Got it" : "Next"}</span>
            {!isLast && <ChevronRight className="size-4 ml-1" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}