import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import ProductImageCard from "@/components/shared/Cards/ProductImageCard";
import Container from "@/components/shared/Container";
import { trendingProductData } from "@/data/dummyData.tsx";
import Link from "next/link";
import React from "react";

const TrendingItem = () => {
  return (
    <Container>
      <div className="flex justify-between items-center gap-x-4 mb-2 ">
        <h4 className="section-name">Trending item</h4>
        <Link
          href={"/shop"}
          className="flex gap-x-2 items-center font-bold group "
        >
          <p>VIEW ALL</p>
          <AnimatedArrow size={20}></AnimatedArrow>
        </Link>
      </div>
      <hr className=" border-primary-gray" />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-4 gap-3 xl:mt-8  md:mt-6 mt-4">
        {trendingProductData?.map((data) => (
          <Link href={`/shop/${data?._id}`}>
            <ProductImageCard data={data}></ProductImageCard>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default TrendingItem;
