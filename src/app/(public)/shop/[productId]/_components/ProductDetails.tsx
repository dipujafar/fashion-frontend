"use client";
import { productDetails } from "@/lib/dummyData.tsx";
import Link from "next/link";
import React from "react";
import ActionButtons from "./ActionButtons";
import SellerDetails from "./SellerDetails";
import { EnvConfig } from "@/config";

const handleShare = () => {
  navigator.share({
    title: productDetails?.title,
    url: `${EnvConfig?.client_url}/shop/${productDetails?._id}`,
  });
};

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
      <div className="space-y-3 ">
        <div className="flex justify-between items-center gap-x-3 xl:mb-4 mb-2">
          <h5 className="uppercase underline text-primary-gray">
            product Details
          </h5>
          <div className="flex gap-x-2">
            <button
              className="size-11 rounded-full flex justify-center items-center cursor-pointer hover:bg-primary-gray/10  transition-all duration-300"
              style={{ boxShadow: "0px 4px 5px 0px rgba(0, 0, 0, 0.07)" }}
              onClick={handleShare}
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className="size-11 rounded-full flex justify-center items-center cursor-pointer hover:bg-primary-gray/10  transition-all duration-300"
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
        <div className="flex md:gap-x-8 gap-x-4 items-center">
          <h2 className="w-[120px]">Total Amount of charity:</h2>
          <p>{productDetails?.charity}%</p>
        </div>
        <div className="flex md:gap-x-8 gap-x-4 items-center">
          <h2 className="w-[120px]">Item Number:</h2>
          <p>{productDetails?.item_Number}</p>
        </div>
        <div className="flex md:gap-x-8 gap-x-4 items-center">
          <h2 className="w-[120px] ">Category :</h2>
          <p>{productDetails?.category}</p>
        </div>
        <div className="flex md:gap-x-8 gap-x-4 lg:items-center">
          <h2 className="w-[120px] ">Tags:</h2>
          <p>
            {productDetails?.tags?.map((tag, index) =>
              index == productDetails?.tags?.length - 1 ? tag : tag + ", "
            )}
          </p>
        </div>
        <div className="flex md:gap-x-8 gap-x-4 items-center">
          <h2 className="w-[120px]">Condition:</h2>
          <p>{productDetails?.condition}</p>
        </div>
        <div className="flex md:gap-x-8 gap-x-4 items-center">
          <h2 className="w-[120px]">Fabric: </h2>
          <p>{productDetails?.fabric}</p>
        </div>
        <div className="flex md:gap-x-8 gap-x-4 items-center">
          <h2 className="w-[120px]">Brands: </h2>
          <p>{productDetails?.brands}</p>
        </div>
        {/* available sizes */}
        <div className="flex flex-col md:flex-row justify-between gap-x-2">
          <div className="flex md:gap-x-8 gap-x-4 items-center">
            <h2 className="w-[120px]">Available Size: </h2>
            <p>{productDetails?.size}</p>
          </div>
          <Link href="#" className="underline text-primary-light-blue">
            View Size Guide
          </Link>
        </div>
        <div className="flex md:gap-x-8 gap-x-4 items-center">
          <h2 className="w-[120px]">Color: </h2>
          <div className="p-0.5 rounded-full border-1 border-primary-gray">
            <div
              style={{ backgroundColor: productDetails?.color }}
              className="size-6 rounded-full"
            ></div>
          </div>
        </div>
        <div className="flex  md:gap-x-8 gap-x-4 items-center">
          <h2 className="w-[120px]">Care Instruction: </h2>
          <p>{productDetails?.care_Instruction}</p>
        </div>
        {/* ======== alert section ============= */}
        <div className="flex gap-x-2 bg-primary-green/10 px-2 py-1 w-fit rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M20.182 4.18144C18.8412 4.03932 17.5216 3.74097 16.25 3.29244C15.0835 2.88029 13.9645 2.34458 12.912 1.69444C12.6375 1.52642 12.3219 1.4375 12 1.4375C11.6781 1.4375 11.3625 1.52642 11.088 1.69444C10.0355 2.34459 8.91646 2.88031 7.75 3.29244C6.47845 3.74097 5.15883 4.03932 3.818 4.18144C3.3879 4.22575 2.98951 4.42797 2.69988 4.749C2.41024 5.07004 2.24995 5.48707 2.25 5.91944V11.1154C2.25083 13.0324 2.76393 14.9144 3.73619 16.5665C4.70845 18.2186 6.10454 19.5809 7.78 20.5124L11.15 22.3844C11.4097 22.5298 11.7024 22.6062 12 22.6062C12.2976 22.6062 12.5903 22.5298 12.85 22.3844L16.22 20.5124C17.8955 19.5809 19.2916 18.2186 20.2638 16.5665C21.2361 14.9144 21.7492 13.0324 21.75 11.1154V5.91944C21.75 5.48707 21.5898 5.07004 21.3001 4.749C21.0105 4.42797 20.6121 4.22575 20.182 4.18144Z"
              fill="#0DB561"
            />
            <path
              d="M11.3011 15.2315C11.0072 15.2322 10.7234 15.1243 10.5041 14.9285L7.65411 12.3955C7.5314 12.2923 7.43062 12.1656 7.35772 12.0227C7.28483 11.8799 7.2413 11.7239 7.2297 11.564C7.21811 11.4041 7.23868 11.2434 7.29022 11.0916C7.34175 10.9397 7.42319 10.7998 7.52973 10.6799C7.63627 10.5601 7.76574 10.4628 7.91051 10.3939C8.05527 10.3249 8.21239 10.2857 8.37258 10.2784C8.53277 10.2712 8.69278 10.2962 8.84316 10.3519C8.99353 10.4075 9.13123 10.4928 9.24811 10.6025L11.2251 12.3585L15.1751 8.14455C15.3929 7.91262 15.6938 7.77657 16.0117 7.76626C16.3297 7.75595 16.6388 7.87222 16.8711 8.08955C17.1035 8.30721 17.2399 8.60824 17.2504 8.92646C17.2609 9.24467 17.1446 9.55404 16.9271 9.78655L12.1771 14.8525C12.0651 14.9728 11.9295 15.0686 11.7788 15.134C11.628 15.1994 11.4654 15.233 11.3011 15.2325V15.2315Z"
              fill="white"
            />
          </svg>
          <p className="text-primary-green">
            Your purchase is protected with secure payment processing.
          </p>
        </div>
      </div>

      {/* ======================= all actions buttons ================ */}
      <ActionButtons></ActionButtons>
      {/* ========================= seller details ========================= */}
      <SellerDetails></SellerDetails>
    </div>
  );
};

export default ProductDetails;
