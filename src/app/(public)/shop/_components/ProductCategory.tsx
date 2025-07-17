"use client";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const productCategoryData = [
  {
    _id: 1,
    label: "Just In",
    value: "just_in",
    image: "/product_category_all.jpg",
  },
  {
    _id: 2,
    label: "Summer Edit",
    value: "summer_edit",
    image: "/product_category_women.jpg",
  },
  {
    _id: 3,
    label: "In trend",
    value: "in_trend",
    image: "/product_category_men.jpg",
  },
  {
    _id: 4,
    label: "On Sale",
    value: "on_sale",
    image: "/product_category_kids.jpg",
  },
];
const ProductCategory = () => {
  const [selectedCategory, setSelectedCategory]= useState("just_in");
  return (
    <div className="grid grid-cols-2 md:gap-4 gap-2 md:grid-cols-4">
      {productCategoryData.map((productCategory) => (
        <div
          style={{ backgroundImage: `url(${productCategory.image})` }}
          key={productCategory?._id}
          className=" 2xl:h-60 xl:h-52 lg:h-44 md:h-36 h-32 bg-cover bg-no-repeat bg-center  transition-all duration-500 rounded relative"
        >
          <Button onClick={() => setSelectedCategory(productCategory?.value)} className={cn("absolute lg:bottom-3 bottom-2 left-1/2 -translate-x-1/2 uppercase bg-primary-white  text-primary-black rounded border-b-3 border-r-3 border-primary-black xl:px-12 lg:px-8 px-5 hover:text-primary-light-pink font-bold group md:text-xs lg:text-sm ", productCategory?.value === selectedCategory && "bg-primary-black text-primary-white")}>
            {productCategory?.label} <AnimatedArrow/>
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ProductCategory;
