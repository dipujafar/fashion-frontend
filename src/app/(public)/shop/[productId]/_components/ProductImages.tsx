"use client";
import React from "react";
import ProductImagesCarousel from "./carousel/ProductImagesCarousel";
import { EmblaOptionsType } from "embla-carousel";
import { IProduct } from "@/types";
import CategoryBreadcrump from "./ProductDetails/CategoryBreadcrump";


const OPTIONS: EmblaOptionsType = {};

const ProductImages = ({ product }: { product: IProduct }) => {
  return (
    <div>
      <CategoryBreadcrump categoryId={product?.category?.id} />
      <ProductImagesCarousel
        options={OPTIONS}
        product={product}
      ></ProductImagesCarousel>
    </div>
  );
};

export default ProductImages;
