import Container from "@/components/shared/Container";
import SaleStatsCard from "@/components/shared/UserProfile/Sale-Product/SaleStatsCard";
import PurchaseProductTable from "@/components/shared/UserProfile/Tables/PurchaseProductTable";
import AddNewProduct from "@/components/shared/UserProfile/UploadProduct/AddNewProduct";
import UploadProductDataFilterOptionAndNav from "@/components/shared/UserProfile/UploadProduct/UploadedProductListDataTable/UploadProductDataFilterOptionAndNav";
import { TotalSaleIcon } from "@/icons";

const saleState = [
  {
    icon: <TotalSaleIcon />,
    title: "Total Purchase Item",
    value: "8",
  },
];
export default function page() {
  return (
    <Container className="md:space-y-8 space-y-5">
      <AddNewProduct link="/assisted-seller/dashboard/products-list/add-product" />
      <UploadProductDataFilterOptionAndNav
        baseLink="/assisted-seller/dashboard/products-list"
        user="user"
      />
      <SaleStatsCard data={saleState} />
      <PurchaseProductTable />
    </Container>
  );
}
