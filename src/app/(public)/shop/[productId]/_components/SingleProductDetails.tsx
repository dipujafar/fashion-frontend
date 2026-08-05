import React from "react";
import ProductDetails from "./ProductDetails/ProductDetails";
import ProductImages from "./ProductImages";

import { IProduct, IUser } from "@/types";
import { notFound } from "next/navigation";

type IUserWithExtra = IUser & {
  _count: {
    products: number;
  }
};

type IProductWithUser = Omit<IProduct, "user"> & {
  user: IUserWithExtra;
};

const SingleProductDetails = async ({ promiseDetails }: { promiseDetails: Promise<{ data: IProductWithUser }> }) => {

  const product = await promiseDetails;

  if (!product?.data) {
    return notFound();
  }

  return (


    <div className="flex flex-col lg:flex-row xl:gap-x-8 gap-x-5 gap-y-5">
      <div className="flex-1">
        <div className="md:mb-0 mb-3 md:hidden">
          {/* <ProductDetailsHeader /> */}
        </div>
        <ProductImages product={product?.data}></ProductImages>
      </div>
      <div className="flex-1">
        <ProductDetails product={product?.data} />
      </div>
    </div>


  );
};

export default SingleProductDetails;
