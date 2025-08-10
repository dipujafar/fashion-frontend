import Container from '@/components/shared/Container'
import AddNewProduct from '@/components/shared/UserProfile/UploadProduct/AddNewProduct'
import UploadedProductListTable from '@/components/shared/UserProfile/UploadProduct/UploadedProductListDataTable/UploadedProductListTable'
import UploadProductDataFilterOptionAndNav from '@/components/shared/UserProfile/UploadProduct/UploadedProductListDataTable/UploadProductDataFilterOptionAndNav'
import React from 'react'

export default function ProductListContainer() {
  return (
      <Container className="md:space-y-8 space-y-5">
      <AddNewProduct link="/assisted-seller/dashboard/products-list/add-product" />
      <UploadProductDataFilterOptionAndNav baseLink="/assisted-seller/dashboard/products-list" user="user" />
      <UploadedProductListTable />
    </Container>
  )
}
