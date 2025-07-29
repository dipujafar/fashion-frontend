import Container from '@/components/shared/Container'
import SaleProductTable from '@/components/shared/UserProfile/Sale-Product/SaleProductTable'
import AddNewProduct from '@/components/shared/UserProfile/UploadProduct/AddNewProduct'
import UploadProductDataFilterOptionAndNav from '@/components/shared/UserProfile/UploadProduct/UploadedProductListDataTable/UploadProductDataFilterOptionAndNav'
import React from 'react'

export default function SaleProductPage() {
  return (
     <Container className="md:space-y-8 space-y-5">
      <AddNewProduct link="/individual-user/uploaded-products-list/add-product" />
      <UploadProductDataFilterOptionAndNav
        baseLink="/charity-shop/dashboard/products-list"
        user="charity store"
      />
      <SaleProductTable userRole='charity store' />
    </Container>
  )
}
