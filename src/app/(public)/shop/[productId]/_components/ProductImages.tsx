"use client";
import React from "react";
import ProductImagesCarousel from "./carousel/ProductImagesCarousel";
import { productDetails } from "@/lib/dummyData.tsx";
import { EmblaOptionsType } from "embla-carousel";

const OPTIONS: EmblaOptionsType = {};

const ProductImages = () => {
  return (
    <div>
      <ProductImagesCarousel
        slides={productDetails?.image}
        options={OPTIONS}
      ></ProductImagesCarousel>
    </div>
  );
};

export default ProductImages;
