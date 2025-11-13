"use client";
import { productDetails } from "@/data/dummyData.tsx";
import Link from "next/link";
import ActionButtons from "../ActionButtons";
import SellerDetails from "../SellerDetails";
import { CheckIcon, ReportIcon, ShareIcon } from "@/icons";
import ProductDetailsHeader from "./ProductDetailsHeader";
import DisplayLargeDescriptionText from "@/components/shared/DisplayLargeDescriptionText";

const handleShare = () => {
  navigator.share({
    title: productDetails?.title,
    url: `/shop/${productDetails?._id}`,
  });
};

const ProductDetails = () => {
  return (
    <div className=" md:space-y-5 space-y-3">
      {/* --------- product header ---------- */}
      <div >
        <ProductDetailsHeader />
      </div>

      {/* --------- product details data ---------- */}
      <div className="space-y-3 ">
        <div className="flex justify-between items-center gap-x-3  mb-2">
          <h5 className="uppercase underline text-primary-gray">
            product Details
          </h5>
          <div className="flex gap-x-2">
            <button
              className="size-10 rounded-full flex justify-center items-center cursor-pointer hover:bg-primary-gray/10  transition-all duration-300"
              style={{ boxShadow: "0px 4px 5px 0px rgba(0, 0, 0, 0.07)" }}
              onClick={handleShare}
            >
              <ShareIcon className="size-5" />
            </button>
            <button
              className="size-10 rounded-full flex justify-center items-center cursor-pointer hover:bg-primary-gray/10  transition-all duration-300"
              style={{ boxShadow: "0px 4px 5px 0px rgba(0, 0, 0, 0.07)" }}
            >
              <ReportIcon className="size-5" />
            </button>
          </div>
        </div>
        <DisplayLargeDescriptionText />
        <div className="flex md:gap-x-8 gap-x-4 items-center">
          <h2 className="w-[120px]">Total Amount of charity:</h2>
          <p className="text-green-600">{productDetails?.charity}%</p>
        </div>
        <div className="flex md:gap-x-8 gap-x-4 items-center">
          <h2 className="w-[120px]">Item Number:</h2>
          <p>{productDetails?.item_Number}</p>
        </div>
        <div className="flex md:gap-x-8 gap-x-4 items-center">
          <h2 className="w-[120px] ">Category :</h2>
          <p>{productDetails?.category} / T-shirt</p>
        </div>
        <div className="flex md:gap-x-8 gap-x-4 lg:items-center">
          <h2 className="w-[120px]  flex-shrink-0">Tags:</h2>
          <p className="flex flex-wrap gap-1 items-center ">
            {productDetails?.tags?.map((tag,index) => (
              <span key={index} className="bg-black text-white px-1.5 rounded text-[15px]">
                {tag}{" "}
              </span>
            ))}
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
          <Link
            href="/product-size"
            className="underline text-primary-light-blue"
          >
            View Size Guide
          </Link>
        </div>
        <div className="flex md:gap-x-8 gap-x-4 items-center">
          <h2 className="w-[120px]">Colour: </h2>
          <p>Gray</p>
        </div>
        <div className="flex  md:gap-x-8 gap-x-4 ">
          <h2 className="w-[120px] flex-shrink-0">Care Instruction: </h2>
          <p>{productDetails?.care_Instruction}</p>
        </div>
        {/* =============== Shipping & Delivery =============== */}
        <div className="flex md:gap-x-8 gap-x-4 items-center">
          <h2 className="w-[120px] flex-shrink-0 ">Shipping & Delivery:</h2>
          <p>UK Standard Shipping (3–5 working days)</p>
        </div>
        {/* =============== Returns Policy =============== */}
        <div className="flex md:gap-x-8 gap-x-4 items-center">
          <h2 className="w-[120px] flex-shrink-0 ">Returns Policy:</h2>
          <p>Returns accepted – 7 days (seller pays postage)</p>
        </div>
        {/* ======== alert section ============= */}
        <div className="flex gap-x-2 bg-primary-green/10 px-2 py-1 w-fit rounded">
          <CheckIcon />
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
