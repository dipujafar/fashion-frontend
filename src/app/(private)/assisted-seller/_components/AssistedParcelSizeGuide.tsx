"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

import defaultBoxImg from "@/assets/sizes/default-box.jpg";
import bagImg from "@/assets/sizes/bag.jpg";
import clothBundleImg from "@/assets/sizes/cloth-bundle.jpg";
import shoesImg from "@/assets/sizes/shoes.jpg";
import boxImg from "@/assets/sizes/box.jpg";
import boxSquareImg from "@/assets/sizes/box-square.jpg";
import tShirtImg from "@/assets/sizes/t-shirt.jpg";
import shirtImg from "@/assets/sizes/shirt.png";
import jumberImg from "@/assets/sizes/jumber.jpg";
import jeansImg from "@/assets/sizes/jeans.jpg";
import jacketImg from "@/assets/sizes/jacket.jpg";
import capImg from "@/assets/sizes/cap.jpg";
import multipleItemsImg from "@/assets/sizes/multiple-items.jpg";

export interface ParcelDimensions {
  weight_kg: string;
  length_cm: string;
  width_cm: string;
  hight_cm: string;
}

interface AssistedParcelSizeGuideProps {
  onApply: (dimensions: ParcelDimensions) => void;
}

interface GuideOption {
  id: string;
  title: string;
  subtitle?: string;
  weight?: string;
  dimensions?: string | null;
  badge?: string | null;
  image: any;
  values: ParcelDimensions | null;
}

const TOP_OPTIONS: GuideOption[] = [
  {
    id: "1-item",
    title: "1 item",
    subtitle: "Up to 1 kg",
    dimensions: "30 × 25 × 8 cm",
    badge: "Suggested",
    image: bagImg,
    values: { weight_kg: "1", length_cm: "30", width_cm: "25", hight_cm: "8" },
  },
  {
    id: "2-3-items",
    title: "2–3 items",
    subtitle: "Up to 2 kg",
    dimensions: "35 × 30 × 10 cm",
    badge: "Suggested",
    image: clothBundleImg,
    values: { weight_kg: "2", length_cm: "35", width_cm: "30", hight_cm: "10" },
  },
  {
    id: "3-5-items",
    title: "3–5 items",
    subtitle: "Up to 3 kg",
    dimensions: "40 × 30 × 15 cm",
    badge: "Suggested",
    image: shoesImg,
    values: { weight_kg: "3", length_cm: "40", width_cm: "30", hight_cm: "15" },
  },
  {
    id: "larger-parcel",
    title: "Larger parcel",
    subtitle: "Up to 5 kg",
    dimensions: "55 × 40 × 30 cm",
    badge: null,
    image: boxImg,
    values: { weight_kg: "5", length_cm: "55", width_cm: "40", hight_cm: "30" },
  },
  {
    id: "over-5-kg",
    title: "Over 5 kg",
    subtitle: "Enter manually",
    dimensions: null,
    badge: null,
    image: boxSquareImg,
    values: null,
  },
];

const COMMON_EXAMPLES: GuideOption[] = [
  {
    id: "t-shirt",
    title: "T-shirt / Top",
    weight: "0.3 kg",
    dimensions: "30 × 25 × 4 cm",
    image: tShirtImg,
    values: { weight_kg: "0.3", length_cm: "30", width_cm: "25", hight_cm: "4" },
  },
  {
    id: "shirt",
    title: "Shirt / Blouse",
    weight: "0.4 kg",
    dimensions: "30 × 25 × 6 cm",
    image: shirtImg,
    values: { weight_kg: "0.4", length_cm: "30", width_cm: "25", hight_cm: "6" },
  },
  {
    id: "jumper",
    title: "Jumper / Hoodie",
    weight: "0.8 kg",
    dimensions: "35 × 30 × 8 cm",
    image: jumberImg,
    values: { weight_kg: "0.8", length_cm: "35", width_cm: "30", hight_cm: "8" },
  },
  {
    id: "jeans",
    title: "Jeans / Trousers",
    weight: "0.8 kg",
    dimensions: "35 × 30 × 8 cm",
    image: jeansImg,
    values: { weight_kg: "0.8", length_cm: "35", width_cm: "30", hight_cm: "8" },
  },
  {
    id: "jacket",
    title: "Jacket (light)",
    weight: "1.0 kg",
    dimensions: "40 × 30 × 10 cm",
    image: jacketImg,
    values: { weight_kg: "1.0", length_cm: "40", width_cm: "30", hight_cm: "10" },
  },
  {
    id: "coat",
    title: "Coat (heavy)",
    weight: "1.8 kg",
    dimensions: "45 × 35 × 15 cm",
    image: jacketImg,
    values: { weight_kg: "1.8", length_cm: "45", width_cm: "35", hight_cm: "15" },
  },
  {
    id: "shoes",
    title: "Shoes / Trainers",
    weight: "1.3 kg",
    dimensions: "35 × 25 × 12 cm",
    image: shoesImg,
    values: { weight_kg: "1.3", length_cm: "35", width_cm: "25", hight_cm: "12" },
  },
  {
    id: "bag",
    title: "Handbag / Bag",
    weight: "1.2 kg",
    dimensions: "40 × 30 × 12 cm",
    image: bagImg,
    values: { weight_kg: "1.2", length_cm: "40", width_cm: "30", hight_cm: "12" },
  },
  {
    id: "accessories",
    title: "Accessories",
    weight: "0.4 kg",
    dimensions: "30 × 25 × 8 cm",
    image: capImg,
    values: { weight_kg: "0.4", length_cm: "30", width_cm: "25", hight_cm: "8" },
  },
  {
    id: "multiple-items",
    title: "Multiple items",
    weight: "2.0 kg",
    dimensions: "45 × 35 × 20 cm",
    image: multipleItemsImg,
    values: { weight_kg: "2.0", length_cm: "45", width_cm: "35", hight_cm: "20" },
  },
  {
    id: "bulky-items",
    title: "Bulky items",
    weight: "3.0–5.0 kg",
    dimensions: "55 × 40 × 30 cm",
    image: boxImg,
    values: { weight_kg: "4.0", length_cm: "55", width_cm: "40", hight_cm: "30" },
  },
];

export function AssistedParcelSizeGuide({ onApply }: AssistedParcelSizeGuideProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleApplySuggested = () => {
    onApply({
      weight_kg: "1.2",
      length_cm: "40",
      width_cm: "30",
      hight_cm: "10",
    });
  };

  const handleSelectOption = (option: GuideOption) => {
    if (option.values) {
      onApply(option.values);
      setModalOpen(false);
    } else {
      toast.info("Please enter your parcel dimensions manually below");
      setModalOpen(false);
    }
  };

  return (
    <>
      {/* Suggested Mixed Items Banner Card */}
      <div className="bg-blue-50 border border-[#D6E4FF] rounded-md p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 shadow-xs">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 flex items-center justify-center">
            <Image
              src={defaultBoxImg}
              alt="Suggested for mixed items"
              className="w-full h-full object-contain"
              width={200}
              height={200}
              priority
            />
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <h4 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                Suggested for mixed items
              </h4>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600 inline-flex items-center cursor-help"
                  >
                    <Info className="size-4 text-[#1A68FF]" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p className="text-xs">
                    Standard parcel size and weight suggested for mixed items
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 font-normal">
              e.g. clothing, shoes, bags
            </p>

            <p className="text-sm sm:text-base font-semibold text-gray-800 pt-0.5">
              1.2 kg • 40 × 30 × 10 cm
            </p>
          </div>
        </div>

        <div className="flex sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
          <div className="hidden sm:block h-14 w-px bg-[#D6E4FF]" />

          <div className="flex flex-col items-stretch sm:items-center gap-2">
            <Button
              type="button"
              onClick={handleApplySuggested}
              className="bg-[#1A68FF] hover:bg-[#1557d6] text-white font-medium px-6 py-2.5 rounded-lg shadow-sm text-sm sm:text-base cursor-pointer transition-colors w-full sm:w-auto h-auto"
            >
              Use suggested size
            </Button>

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="text-[#1A68FF] hover:underline text-xs sm:text-sm font-medium cursor-pointer text-center"
            >
              See full packaging guide
            </button>
          </div>
        </div>
      </div>

      {/* Parcel Size Guide Dialog */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="w-full sm:max-w-3xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 md:p-8">
          <DialogHeader className="space-y-1.5 pb-2 text-left">
            <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900">
              Parcel Size Guide
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Choose the closest option for your parcel. These are suggested weights and sizes based on common items.
              <br />
              You can edit the dimensions if needed.
            </DialogDescription>
          </DialogHeader>

          {/* Top 5 suggested options */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-4">
            {TOP_OPTIONS.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelectOption(item)}
                className="relative border border-gray-200 rounded-lg p-3 flex flex-col items-center text-center bg-white hover:border-[#1A68FF] hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="h-5 w-full flex items-center justify-start">
                  {item.badge ? (
                    <span className="bg-[#1A68FF] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  ) : null}
                </div>

                <div className="w-full h-24 flex items-center justify-center p-1 my-1">
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="max-h-20 max-w-full object-contain group-hover:scale-105 transition-transform"
                    width={150}
                    height={150}
                  />
                </div>

                <p className="font-bold text-gray-900 text-sm mt-1">{item.title}</p>
                <p className="text-xs text-gray-500">{item.subtitle}</p>
                {item.dimensions && (
                  <p className="text-xs text-gray-400 mt-0.5">{item.dimensions}</p>
                )}
              </div>
            ))}
          </div>

          {/* Common Examples Section */}
          <div className="mt-8">
            <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
              Common examples
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {COMMON_EXAMPLES.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectOption(item)}
                  className="border border-gray-200 rounded-lg p-3 flex flex-col items-center text-center bg-white hover:border-[#1A68FF] hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="w-full h-24 flex items-center justify-center p-1">
                    <Image
                      src={item.image}
                      alt={item.title}
                      className="max-h-20 max-w-full object-contain group-hover:scale-105 transition-transform"
                      width={150}
                      height={150}
                    />
                  </div>

                  <p className="font-bold text-gray-900 text-sm mt-2">{item.title}</p>
                  <p className="text-xs font-semibold text-gray-900 mt-0.5">{item.weight}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.dimensions}</p>
                </div>
              ))}

              {/* Info callout block aligned in the grid */}
              <div className="col-span-2 sm:col-span-2 md:col-span-4 bg-[#F0F6FF] border border-[#D6E4FF] rounded-xl p-4 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#1A68FF] text-white flex items-center justify-center shrink-0 font-serif font-bold text-xs mt-0.5">
                  i
                </div>
                <ul className="text-xs sm:text-sm text-gray-600 space-y-1.5 list-disc list-outside pl-3 leading-relaxed">
                  <li>
                    Weights and sizes <span className="font-semibold text-gray-800">are estimates</span> including packaging.
                  </li>
                  <li>
                    Choose the closest option for your parcel. You can edit the numbers if needed.
                  </li>
                  <li>
                    If your parcel is larger or heavier, please enter your own dimensions.
                  </li>
                  <li>
                    Examples are a guide only and may vary depending on the item and packaging.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

