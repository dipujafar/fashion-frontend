// import { productDetails } from "@/data/dummyData.tsx";
// import { HeartIcon2, OfferIcon2 } from "@/icons";
import { IProduct } from "@/types";
import React from "react";
import FavouritesWithServer from "../FavouritesWithServer";

export default function ProductDetailsHeader({ product }: { product: IProduct }) {
  return (
    <div className="xl:space-y-1 space-y-0.5">

      <div className="flex justify-between items-center gap-x-3 relative">

        <h4 className="md:text-xl text-lg text-[#262626] font-semibold">
          {product?.title}
        </h4>

        {/* ===================== favorite button ================ */}
        <FavouritesWithServer id={product?.id} count={product?._count?.favourites} includedProduct={product?.favourites}></FavouritesWithServer>

      </div>

      <div className="flex space-y-1.5 justify-between flex-col md:justify-start ">

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
