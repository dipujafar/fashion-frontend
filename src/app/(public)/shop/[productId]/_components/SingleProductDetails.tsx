import Container from "@/components/shared/Container";
import React from "react";
import ProductDetails from "./ProductDetails";
import ProductImages from "./ProductImages";
import ProductDescription from "./ProductDescription";

const SingleProductDetails = () => {
  return (
    <Container className="xl:space-y-8 lg:space-y-6 space-y-5">
      <div className="flex flex-col lg:flex-row xl:gap-x-8 gap-x-5 gap-y-5">
        <div className="flex-1">
          <ProductImages></ProductImages>
        </div>
        <div className="flex-1">
          <ProductDetails></ProductDetails>
        </div>
      </div>

      <ProductDescription></ProductDescription>
    </Container>
  );
};

export default SingleProductDetails;
