import React from "react";
import Container from "@/components/shared/Container";
import AddNewProduct from "@/components/shared/UserProfile/UploadProduct/AddNewProduct";
import UploadedProductListTable from "@/components/shared/UserProfile/UploadProduct/UploadedProductListDataTable/UploadedProductListTable";
import UploadProductDataFilterOptionAndNav from "@/components/shared/UserProfile/UploadProduct/UploadedProductListDataTable/UploadProductDataFilterOptionAndNav";

const UploadedProductList = () => {
  return (
    <Container className="md:space-y-8 space-y-5">
      <AddNewProduct link="/individual-user/dashboard/uploaded-products-list/add-product" />
      <UploadProductDataFilterOptionAndNav baseLink="/individual-user/dashboard/uploaded-products-list" user="user" />
      <UploadedProductListTable />
    </Container>
  );
};

export default UploadedProductList;
