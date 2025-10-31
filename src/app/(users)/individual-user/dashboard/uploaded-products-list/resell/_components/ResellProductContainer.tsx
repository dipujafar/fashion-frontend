import React from "react";
import ResellProductImages from "./ResellProductImages";
import ResellProductDetails from "./ResellProductDetails";
import ResellProductDescription from "./ResellProductDescription";
import { Button } from "@/components/ui/button";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import Link from "next/link";
import DisplayLargeDescriptionText from "@/components/shared/DisplayLargeDescriptionText";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const product = {
  id: "1",
  item_number: "#A12345",
  category: "Women",
  tags: ["Sweatshirt", "Women's", "Clothing", "Casual Wear", "Heart Design"],
  condition: "2 Months Used",
  fabric: "Cotton Blend",
  brand: "Gucci",
  available_size: ["S", "M", "L"],
  color: "#A9A9A9",
  care_instruction: ["Machine wash cold", "tumble dry low", "do not bleach"],
  images: [
    "/offer_page_product1.png",
    "/offer_page_product2.png",
    "/offer_page_product3.png",
    "/offer_page_product2.png",
    "/offer_page_product2.png",
  ],
};

const ResellProductContainer = () => {
  return (
    <div className="space-y-4">
      {/* <ResellProductImages productImages={product?.images} /> */}
      <div className="space-y-4 grid xl:grid-cols-3 gap-x-5">
        <ResellProductDetails />

        <div className="lg:col-span-2 space-y-2">
          <ResellProductImages productImages={product?.images} />
          <DisplayLargeDescriptionText length={300} />
        </div>
      </div>
      <div className="flex md:gap-x-4 gap-y-2 flex-col md:flex-row">
        <div className="flex-1 group cursor-pointer">
          <Link href={"/sell-products?edit=true"}>
            <Button className="w-full cursor-pointer bg-transparent text-black hover:bg-black/10 border-b-2 border-r-2 border-black rounded-none">
              Edit <AnimatedArrow />
            </Button>
          </Link>
        </div>

        <div className="flex-1 group cursor-pointer">
          <Popover>
            <PopoverTrigger className="w-full">
              <Button className="w-full rounded-none cursor-pointer">
                Submit <AnimatedArrow />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="lg:w-2xl  w-xl">
              <p>If you don’t make any changes, the data will be submitted for sale with the same details and the same charity for donation. If you want to modify anything, please click Edit.
              </p>
              <div className="flex gap-x-2 mt-1">
                <Link href={"/sell-products?edit=true"} className="flex-1">
                  <Button className="w-full cursor-pointer bg-transparent text-black hover:bg-black/10 border-b-2 border-r-2 border-black rounded-none">
                    Edit <AnimatedArrow />
                  </Button>
                </Link>
                <Button  className="w-full rounded-none cursor-pointer flex-1">
                  Submit <AnimatedArrow />
                </Button>
              </div>
            </PopoverContent>
          </Popover>

        </div>
      </div>
    </div>
  );
};

export default ResellProductContainer;
