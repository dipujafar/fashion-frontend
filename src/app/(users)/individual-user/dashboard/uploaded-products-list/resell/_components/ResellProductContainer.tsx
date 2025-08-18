import React from "react";
import ResellProductImages from "./ResellProductImages";
import ResellProductDetails from "./ResellProductDetails";
import ResellProductDescription from "./ResellProductDescription";
import { Button } from "@/components/ui/button";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import Link from "next/link";

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
      <ResellProductImages productImages={product?.images} />
      <div className="space-y-4 grid lg:grid-cols-3 gap-x-5">
        <ResellProductDetails productDetails={product} />
        <div className="lg:col-span-2">
          <ResellProductDescription />
        </div>
      </div>
      <div className="flex gap-x-4 flex-col md:flex-row">
        <div className="flex-1 group cursor-pointer">
          <Link href={"/individual-user/uploaded-products-list/add-product"}>
            <Button className="w-full bg-transparent text-black hover:bg-black/10 border-b-2 border-r-2 border-black rounded-none">
              Edit <AnimatedArrow />
            </Button>
          </Link>
        </div>

        <div className="flex-1 group cursor-pointer">
          <Button className="w-full rounded-none">
            Submit <AnimatedArrow />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResellProductContainer;
