import { productDetails, productsData } from "@/lib/dummyData.tsx";
import React from "react";

const ProductDetails = () => {
  return (
    <div className="xl:space-y-8 space-x-5">
      {/* --------- product header ---------- */}
      <div className="xl:space-y-3 space-x-2">
        <h6 className="bg-[#87CEEB] w-fit px-3 rounded-xs text-primary-white italic">
          {productDetails?.tag}
        </h6>
        <h4 className="md:text-3xl text-xl">{productDetails?.title}</h4>
        {productDetails?.discount && (
          <div className="flex gap-x-6 items-center">
            <p className="line-through text-primary-gray text-lg">
              {productDetails?.originalPrice}
            </p>
            <div className="bg-primary-red text-primary-white px-4 py-1 rounded">
              {productDetails?.discount}
            </div>
          </div>
        )}
        <h4 className="md:text-3xl text-xl">${productDetails?.price}</h4>
      </div>

      {/* --------- product details data ---------- */}
      <div className="xl:space-y-3 space-x-2">
        <div className="flex justify-between items-center gap-x-3 xl:mb-4 mb-2">
          <h5 className="uppercase underline text-primary-gray">
            product Details
          </h5>
          <div className="flex gap-x-2">
            <button
              className="size-11 rounded-full flex justify-center items-center cursor-pointer"
              style={{ boxShadow: "0px 4px 5px 0px rgba(0, 0, 0, 0.07)" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M1 11.5L1 12.375C1 13.8247 2.17525 15 3.625 15L12.375 15C13.8247 15 15 13.8247 15 12.375L15 11.5M11.5 4.5L8 1M8 1L4.5 4.5M8 1L8 11.5"
                  stroke="#E12728"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <button
              className="size-11 rounded-full flex justify-center items-center cursor-pointer"
              style={{ boxShadow: "0px 4px 5px 0px rgba(0, 0, 0, 0.07)" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M3.43359 15.1673C3.16026 15.1673 2.93359 14.9407 2.93359 14.6673V1.33398C2.93359 1.06065 3.16026 0.833984 3.43359 0.833984C3.70693 0.833984 3.93359 1.06065 3.93359 1.33398V14.6673C3.93359 14.9407 3.70693 15.1673 3.43359 15.1673Z"
                  fill="#E12728"
                />
                <path
                  d="M10.9003 11.166H3.43359C3.16026 11.166 2.93359 10.9393 2.93359 10.666C2.93359 10.3927 3.16026 10.166 3.43359 10.166H10.9003C11.6269 10.166 11.9669 9.97268 12.0336 9.80602C12.1003 9.63935 12.0003 9.26602 11.4803 8.75268L10.6803 7.95268C10.3536 7.66602 10.1536 7.23268 10.1336 6.75268C10.1136 6.24602 10.3136 5.74602 10.6803 5.37935L11.4803 4.57935C11.9736 4.08602 12.1269 3.68602 12.0536 3.51268C11.9803 3.33935 11.6003 3.16602 10.9003 3.16602H3.43359C3.15359 3.16602 2.93359 2.93935 2.93359 2.66602C2.93359 2.39268 3.16026 2.16602 3.43359 2.16602H10.9003C12.3603 2.16602 12.8269 2.77268 12.9803 3.13268C13.1269 3.49268 13.2269 4.25268 12.1869 5.29268L11.3869 6.09268C11.2203 6.25935 11.1269 6.49268 11.1336 6.72602C11.1403 6.92602 11.2203 7.10602 11.3603 7.23268L12.1869 8.05268C13.2069 9.07268 13.1069 9.83268 12.9603 10.1993C12.8069 10.5527 12.3336 11.166 10.9003 11.166Z"
                  fill="#E12728"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex gap-8 items-center">
          <h2 className="w-[115px]">Total Amount of charity:</h2>
          <p>{productDetails?.charity}%</p>
        </div>
        <div className="flex gap-8 items-center">
          <h2 className="w-[115px]">Item Number:</h2>
          <p>{productDetails?.item_Number}</p>
        </div>
        <div className="flex gap-8 items-center">
          <h2 className="w-[115px]">Category :</h2>
          <p>{productDetails?.category}</p>
        </div>
        <div className="flex gap-8 items-center">
          <h2 className="w-[115px]">Tags:</h2>
          <p>{productDetails?.charity}</p>
        </div>
        <div className="flex gap-8 items-center">
          <h2 className="w-[115px]">Condition:</h2>
          <p>{productDetails?.charity}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
