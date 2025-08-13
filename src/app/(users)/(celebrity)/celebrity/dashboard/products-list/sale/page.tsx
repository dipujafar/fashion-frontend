import Container from "@/components/shared/Container";
import SaleProductTable from "@/components/shared/UserProfile/Sale-Product/SaleProductTable";
import SaleStatsCard from "@/components/shared/UserProfile/Sale-Product/SaleStatsCard";
import AddNewProduct from "@/components/shared/UserProfile/UploadProduct/AddNewProduct";
import UploadProductDataFilterOptionAndNav from "@/components/shared/UserProfile/UploadProduct/UploadedProductListDataTable/UploadProductDataFilterOptionAndNav";
import { EaringIcon, TotalSaleIcon } from "@/icons";

const saleState = [
  {
    icon: <TotalSaleIcon />,
    title: "Total Sales",
    value: "25",
  },
  {
    icon: <EaringIcon />,
    title: "Total Earning",
    value: "$2,000",
  },
];

export default function SalePage() {
  return (
    <Container className="md:space-y-8 space-y-5">
      <AddNewProduct link="/celebrity/dashboard/products-list/add-product" />
      <UploadProductDataFilterOptionAndNav
        baseLink="/celebrity/dashboard/products-list"
        user="user"
      />
      <SaleStatsCard data={saleState} />
      <SaleProductTable />
    </Container>
  )
}
