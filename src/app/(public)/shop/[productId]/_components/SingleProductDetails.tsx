import React from "react";
import ProductDetails from "./ProductDetails/ProductDetails";
import ProductImages from "./ProductImages";
import { IProduct, ISize, IUser } from "@/types";
import { SMActionButtons } from "./ActionButtons";

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
  },
  sizechart: ISize[]
};

const SingleProductDetails = async ({ product }: { product: { data: IProductWithUser } }) => {

  const isStockOut = product?.data?.stock === 0;

  return (

    <div>

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
          <SMActionButtons product={product?.data} isSold={isStockOut}></SMActionButtons>
        </div>

      </div>
    </div>


  );
};

export default SingleProductDetails;
