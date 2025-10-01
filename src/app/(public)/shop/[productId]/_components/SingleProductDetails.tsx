import Container from "@/components/shared/Container";
import React from "react";
import ProductDetails from "./ProductDetails/ProductDetails";
import ProductImages from "./ProductImages";
import ProductDescription from "./ProductDescription";
import ReviewContainer from "./review/ReviewContainer";
import DisplayProductSection from "@/components/shared/DisplayProductSection/DisplayProductSection";
import { recentlyViewedData, trendingProductData } from "@/data/dummyData.tsx";
import CharitySupportCards from "@/components/shared/Cards/CharitySupportCards";
import CharityInfo from "./dialog/CharityInfo";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import ProductDetailsHeader from "./ProductDetails/ProductDetailsHeader";

const SingleProductDetails = () => {
  return (
    <Container className="xl:space-y-8 lg:space-y-6 space-y-8">
      <div className="flex flex-col lg:flex-row xl:gap-x-8 gap-x-5 gap-y-5">
        <div className="flex-1">
          <div className="md:mb-0 mb-3 md:hidden">
            <ProductDetailsHeader/>
          </div>
          <ProductImages></ProductImages>
        </div>
        <div className="flex-1">
          <ProductDetails></ProductDetails>
        </div>
      </div>
      <ReviewContainer></ReviewContainer>
      <div>
        <div>
          {/* ======================================= section header ========================================== */}
          <div className="flex-between lg:mb-2 mb-1 ">
            <div className="flex items-center gap-x-1.5">
              <h4 className="lg:text-2xl text-lg font-medium">
                Charity Support
              </h4>
              <CharityInfo />
            </div>
            <div className="flex gap-x-3 items-center group cursor-pointer">
              <h4 className=" font-bold   ">ADD DONATE</h4>
              <AnimatedArrow size={20} />
            </div>
          </div>

          <hr className="border lg:mb-6 mb-4" />
        </div>
        <CharitySupportCards></CharitySupportCards>
      </div>

      <ProductDescription></ProductDescription>
      <DisplayProductSection
        title="Recently Viewed"
        data={recentlyViewedData}
      ></DisplayProductSection>

      <DisplayProductSection
        title="You may also like"
        data={trendingProductData}
      ></DisplayProductSection>
    </Container>
  );
};

export default SingleProductDetails;
