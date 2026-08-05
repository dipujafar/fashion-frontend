"use client";
import React from "react";
import ProductImagesCarousel from "./carousel/ProductImagesCarousel";
import { EmblaOptionsType } from "embla-carousel";
import { IProduct } from "@/types";
import Link from "next/link";

const OPTIONS: EmblaOptionsType = {};

const ProductImages = ({ product }: { product: IProduct }) => {
  return (
    <div>
      <div className="py-2">
        {product?.catagory_hierarchy?.map((i, index) => (
          <React.Fragment key={i?.id}>
            <Link href={`/shop?category=${i?.id}`} className="font-medium underline text-black underline-offset-2 last:no-underline last:text-gray-700">{i?.name}</Link>
            {index !== product.catagory_hierarchy.length - 1 && " / "}
          </React.Fragment>
        ))}
      </div>
      <ProductImagesCarousel
        options={OPTIONS}
        product={product}
      ></ProductImagesCarousel>
    </div>
  );
};

export default ProductImages;
