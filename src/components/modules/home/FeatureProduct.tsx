import ProductCard from "@/components/shared/Cards/ProductCard";
import Container from "@/components/shared/Container";
import { productsData } from "@/lib/dummyData.tsx";
import React from "react";

const FeatureProduct = () => {
  return (
    <Container className="md:space-y-8 space-y-4">
      <div>
        <h6 className="page-title uppercase md:text-xl text-base text-center  mb-2">
          fashion trend, style
        </h6>
        <h2 className="section-name text-center lg:text-3xl text-base  ">
          Timeless Fashion, Sustainable Impact
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3   2xl:grid-cols-4  md:gap-4 gap-x-2 gap-y-4 xl:gap-6 ">
        {productsData?.slice(0, 8).map((user) => (
          <ProductCard data={user} key={user._id}></ProductCard>
        ))}
      </div>
    </Container>
  );
};

export default FeatureProduct;
