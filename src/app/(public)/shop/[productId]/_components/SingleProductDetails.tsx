import Container from "@/components/shared/Container";
import React from "react";
import ProductDetails from "./ProductDetails";
import ProductImages from "./ProductImages";

const SingleProductDetails = () => {
  return (
    <Container>
      <div className="flex flex-col lg:flex-row xl:gap-x-8 gap-x-5 gap-y-5">
        <div className="flex-1">
          <ProductImages></ProductImages>
        </div>
        <div className="flex-1">
          <ProductDetails></ProductDetails>
        </div>
      </div>
    </Container>
  );
};

export default SingleProductDetails;
