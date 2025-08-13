import Container from "@/components/shared/Container";
import AddNewProduct from "@/components/shared/UserProfile/UploadProduct/AddNewProduct";
import UploadedProductListTable from "@/components/shared/UserProfile/UploadProduct/UploadedProductListDataTable/UploadedProductListTable";
import UploadProductDataFilterOptionAndNav from "@/components/shared/UserProfile/UploadProduct/UploadedProductListDataTable/UploadProductDataFilterOptionAndNav";
import React from "react";

export default function page() {
  return (
    <Container className="md:space-y-8 space-y-5">
      <AddNewProduct link="/celebrity/dashboard/products-list/add-product" />
      <UploadProductDataFilterOptionAndNav
        baseLink="/celebrity/dashboard/products-list"
        user="user"
      />
      <UploadedProductListTable />
    </Container>
  );
}
