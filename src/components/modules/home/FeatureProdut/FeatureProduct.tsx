import ProductCard from "@/components/shared/Cards/ProductCard";
import Container from "@/components/shared/Container";
import { productsData } from "@/lib/dummyData.tsx";
import React from "react";
import FeatureProductCategory from "./FeatureProductCategory";
import Link from "next/link";
import CommonButton from "@/components/ui/common-button";

const FeatureProduct = () => {
  return (
    <Container className="lg:space-y-8 space-y-4">
      <div>
        <h6 className="page-title uppercase md:text-xl text-base text-center  mb-2">
          fashion trend, style
        </h6>
        <h2 className="section-name text-center lg:text-3xl text-base">
          Timeless Fashion, Sustainable Impact
        </h2>
      </div>
      <div className="flex gap-x-4 justify-between items-center">
        <div className=" md:w-[calc(100%-150px)] w-[calc(100%-110px)]">
          <FeatureProductCategory></FeatureProductCategory>
        </div>
        <Link href={"/shop"}>
          <CommonButton className="py-2">View All</CommonButton>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2  lg:grid-cols-3   2xl:grid-cols-4  md:gap-4 gap-x-2 gap-y-4 xl:gap-6 ">
        {productsData?.slice(0, 8).map((user) => (
          <ProductCard data={user} key={user._id}></ProductCard>
        ))}
      </div>
    </Container>
  );
};

export default FeatureProduct;
