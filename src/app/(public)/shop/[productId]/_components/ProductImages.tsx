"use client";
import React from "react";
import ProductImagesCarousel from "./carousel/ProductImagesCarousel";
import { EmblaOptionsType } from "embla-carousel";
import { IProduct } from "@/types";

const OPTIONS: EmblaOptionsType = {};

const ProductImages = ({ product }: { product : IProduct }) => {
  return (
    <div>
      <ProductImagesCarousel
        options={OPTIONS}
        product={product}
      ></ProductImagesCarousel>
    </div>
  );
};

export default ProductImages;
