"use client";
import { HeartIcon, OfferIcon } from "@/app/icons";
import { Button } from "@/components/ui/button";
import CommonButton from "@/components/ui/common-button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const ActionButtons = () => {
  const [quality, setQuality] = useState<number>(1);
  return (
    <div className="lg:space-y-6 space-y-3">
      <h6 className="uppercase text-primary-gray underline">Quantity</h6>
      {/* =============== action buttons ================ */}
      <div className="lg:space-y-4 space-y-3 max-w-lg">
        {/* =============== quantity &  add to cart  button ================ */}
        <div className="flex items-center lg:gap-x-6 gap-x-4">
          <div className="border border-primary-gray/40 rounded-2xl flex   gap-x-2">
            <button
              className="size-10 text-xl cursor-pointer flex-center"
              onClick={() => setQuality(quality + 1)}
            >
              <Plus size={20} color="#B0B0B0" />
            </button>
            <span className="size-10 text-xl  flex-center">{quality}</span>
            <button
              disabled={quality === 1}
              className="size-10  cursor-pointer flex-center"
              onClick={() => setQuality(quality - 1)}
            >
              <Minus size={20} color="#B0B0B0" />
            </button>
          </div>
          <CommonButton className="flex-1">ADD TO CART</CommonButton>
        </div>
        {/* =============== buy now  button ================ */}
        <CommonButton className="w-full bg-primary-gray/10 text-primary-black hover:bg-primary-black/20 border-b-4 border-r-4 border-black">
          Buy It Now
        </CommonButton>
     

        <Button className=" rounded  uppercase md:min-w-40 md:py-5 cursor-pointer w-full bg-primary-gray/10 text-primary-black hover:bg-primary-black/20 border-b-4 border-r-4 border-black group">
          add to favourite <HeartIcon className="ml-2 size-5"></HeartIcon>
        </Button>

        <Button className=" rounded  uppercase md:min-w-40 md:py-5 cursor-pointer w-full bg-primary-gray/10 text-primary-black hover:bg-primary-black/20 border-b-4 border-r-4 border-black group">
         make an offer <OfferIcon className="ml-2 size-5"></OfferIcon>
        </Button>
     
      </div>
    </div>
  );
};

export default ActionButtons;
