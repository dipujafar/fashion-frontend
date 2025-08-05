import Container from '@/components/shared/Container'
import AddNewProduct from '@/components/shared/UserProfile/UploadProduct/AddNewProduct'
import UploadedProductListTable from '@/components/shared/UserProfile/UploadProduct/UploadedProductListDataTable/UploadedProductListTable'
import UploadProductDataFilterOptionAndNav from '@/components/shared/UserProfile/UploadProduct/UploadedProductListDataTable/UploadProductDataFilterOptionAndNav'

export default function ProductListContainer() {
  return (
     <Container className="md:space-y-8 space-y-5">
      <AddNewProduct link="/eco-friendly-store/dashboard/products-list/add-product" />
      <UploadProductDataFilterOptionAndNav baseLink="/eco-friendly-store/dashboard/products-list" user="charity store" />
      <UploadedProductListTable />
    </Container>
  )
}
