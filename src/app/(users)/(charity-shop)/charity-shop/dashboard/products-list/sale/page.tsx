import Container from '@/components/shared/Container'
import SaleProductTable from '@/components/shared/UserProfile/Sale-Product/SaleProductTable'
import SaleStatsCard from '@/components/shared/UserProfile/Sale-Product/SaleStatsCard'
import AddNewProduct from '@/components/shared/UserProfile/UploadProduct/AddNewProduct'
import UploadProductDataFilterOptionAndNav from '@/components/shared/UserProfile/UploadProduct/UploadedProductListDataTable/UploadProductDataFilterOptionAndNav'
import { EaringIcon, TotalSaleIcon } from '@/icons'
import React from 'react'

  const saleState = [
    {
      icon: <TotalSaleIcon />,
      title: "Total Product Sales",
      value: "25",
    },
    {
      icon: <EaringIcon />,
      title: "Total Fund Rised",
      value: "$2,000",
    },
  ];

export default function SaleProductPage() {
  return (
     <Container className="md:space-y-8 space-y-5">
      <AddNewProduct link="/individual-user/uploaded-products-list/add-product" />
      <UploadProductDataFilterOptionAndNav
        baseLink="/charity-shop/dashboard/products-list"
        user="charity store"
      />

        <SaleStatsCard data={saleState} />
      <SaleProductTable userRole='charity store' />
    </Container>
  )
}
