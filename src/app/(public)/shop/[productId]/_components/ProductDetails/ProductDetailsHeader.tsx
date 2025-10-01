import { productDetails } from "@/data/dummyData.tsx";
import { HeartIcon2, OfferIcon2 } from "@/icons";
import React from "react";

export default function ProductDetailsHeader() {
  return (
    <div className="xl:space-y-3 space-x-2">
      <h4 className="md:text-3xl text-xl text-[#262626]">
        {productDetails?.title}
      </h4>
      <h6 className="bg-[#87CEEB] w-fit px-3 rounded-xs text-primary-white italic mb-2 ">
        {productDetails?.tag}
      </h6>
      <div className="flex gap-x-3">
        <h6 className="bg-[#C4C4C4] w-fit px-3 rounded-xs text-primary-white italic flex items-center gap-x-1">
          <OfferIcon2 className="size-4"></OfferIcon2> 12 Offer sent
        </h6>
        <h6 className="bg-[#C4C4C4] w-fit px-3 rounded-xs text-primary-white italic flex items-center gap-x-1">
          <HeartIcon2 className="size-4"></HeartIcon2> 24
        </h6>
      </div>

      {productDetails?.discount && (
        <div className="flex gap-x-6 items-center">
          <p className="line-through text-primary-gray text-lg">
            {productDetails?.originalPrice}
          </p>
          <div className="text-primary-red   rounded">
            -{productDetails?.discount}
          </div>
        </div>
      )}
      <h4 className="md:text-3xl text-xl">${productDetails?.price}</h4>
    </div>
  );
}
