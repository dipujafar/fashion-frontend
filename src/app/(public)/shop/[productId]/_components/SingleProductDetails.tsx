import Container from "@/components/shared/Container";
import React from "react";
import ProductDetails from "./ProductDetails";
import ProductImages from "./ProductImages";
import ProductDescription from "./ProductDescription";
import CharitySupport from "./CharitySupport";
import RecentlyViewed from "@/components/shared/RecentlyViewed/RecentlyViewed";
import ReviewContainer from "./review/ReviewContainer";
import DisplayProductSection from "@/components/shared/DisplayProductSection/DisplayProductSection";
import { recentlyViewedData, trendingProductData } from "@/data/dummyData.tsx";

const SingleProductDetails = () => {
  return (
    <Container className="xl:space-y-8 lg:space-y-6 space-y-8">
      <div className="flex flex-col lg:flex-row xl:gap-x-8 gap-x-5 gap-y-5">
        <div className="flex-1">
          <ProductImages></ProductImages>
        </div>
        <div className="flex-1">
          <ProductDetails></ProductDetails>
        </div>
      </div>
      <ReviewContainer></ReviewContainer>
      <CharitySupport></CharitySupport>

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
