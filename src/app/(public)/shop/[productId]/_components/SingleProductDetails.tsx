import React from "react";
import ProductDetails from "./ProductDetails/ProductDetails";
import ProductImages from "./ProductImages";
import { IProduct, IUser } from "@/types";
import { MessageIcon, OfferIcon } from "@/icons";
import { Button } from "@/components/ui/button";

type IUserWithExtra = IUser & {
  _count: {
    products: number;
  },
  bundleDiscount: {
    tiers: {
      itemCount: number;
      discountPercent: number;
    }[]
  } | null;
};

type IProductWithUser = Omit<IProduct, "user"> & {
  user: IUserWithExtra;
  _count: {
    cartItems: number;
    favourites: number;
  }
};

const SingleProductDetails = async ({ product }: { product: { data: IProductWithUser } }) => {

  const isStockOut = product?.data?.stock === 0;

  return (

    <div>

      {isStockOut && <div className="bg-destructive py-4">
        <p className="text-center text-white">Item Sold Out</p>
      </div>}

      <div className="flex flex-col lg:flex-row xl:gap-x-8 gap-x-5 gap-y-5">
        <div className="flex-1">
          <div className="md:mb-0 mb-3 md:hidden">
            {/* <ProductDetailsHeader /> */}
          </div>
          <ProductImages product={product?.data}></ProductImages>
        </div>

        <div className="flex-1 xl:mt-5">
          <ProductDetails product={product?.data} />
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 shadow-lg md:hidden z-10">
          <div className="max-w-6xl mx-auto flex items-center gap-3">
            <Button><MessageIcon className="size-11" /></Button>

            <Button
              // onClick={() => setShowOpenOfferModal(true)}
              className="py-5 border-2 border-primary-black rounded-none font-semibold cursor-pointer" variant={"outline"}>Make an offer <OfferIcon className="size-5"></OfferIcon></Button>

            <Button className="py-5 border-2 border-primary-black rounded-none font-semibold cursor-pointer flex-1">Buy now</Button>

          </div>
        </div>

      </div>
    </div>


  );
};

export default SingleProductDetails;
