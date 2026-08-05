// import { productDetails } from "@/data/dummyData.tsx";
// import { HeartIcon2, OfferIcon2 } from "@/icons";
import { IProduct } from "@/types";
import React from "react";
import FavouritesWithServer from "../FavouritesWithServer";

export default function ProductDetailsHeader({ product }: { product: IProduct }) {
  return (
    <div className="xl:space-y-2 space-y-0.5">
      {/* visible only for mobile devices */}
      {/* <h6 className="bg-[#87CEEB] w-fit px-3 rounded-xs text-primary-white italic  md:hidden ">
        {productDetails?.tag}
      </h6> */}
      <div className="flex justify-between items-center gap-x-3 relative">
        <h4 className="md:text-2xl text-xl text-[#262626] font-semibold">
          {product?.title}
        </h4>

        {/* ===================== favorite button ================ */}
        <FavouritesWithServer id={product?.id} count={product?._count?.favourites} includedProduct={product?.favourites}></FavouritesWithServer>

      </div>
      {/* <h6 className="bg-[#87CEEB] w-fit px-3 rounded-xs text-primary-white italic mb-2 hidden md:block ">
        {productDetails?.tag}
      </h6> */}
      {/* <div className="flex justify-between md:justify-start gap-x-3">
        <h6 className="bg-[#C4C4C4] w-fit px-3 rounded-xs text-primary-white italic flex items-center gap-x-1">
          <OfferIcon2 className="size-4"></OfferIcon2> 12 Offer sent
        </h6>
        <h6 className="bg-[#C4C4C4] w-fit px-3 rounded-xs text-primary-white italic flex items-center gap-x-1">
          <HeartIcon2 className="size-4"></HeartIcon2> 24
        </h6>
      </div> */}

      <div className="flex space-y-1.5 flex-row-reverse justify-between md:flex-col md:justify-start ">

        <h4 className="md:text-2xl text-xl font-semibold">${product?.finalPrice}</h4>
        {product?.discountPct > 0 && (
          <div className="flex gap-x-3 items-center">
            <p className="line-through text-primary-gray text-lg font-semibold">
              ${product?.price}
            </p>
            <div className="bg-primary-red text-primary-white rounded px-2 py-0.5 text-sm">
              -{product?.discountPct}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
