import React from "react";
import ResellProductImages from "./ResellProductImages";
import ResellProductDetails from "./ResellProductDetails";
import ResellProductDescription from "./ResellProductDescription";

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
    </div>
  );
};

export default ResellProductContainer;
