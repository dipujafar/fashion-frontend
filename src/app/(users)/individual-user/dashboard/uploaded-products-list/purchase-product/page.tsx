import Container from "@/components/shared/Container";

import UploadProductDataFilterOptionAndNav from "@/components/shared/UserProfile/UploadProduct/UploadedProductListDataTable/UploadProductDataFilterOptionAndNav";
import AddNewProduct from "@/components/shared/UserProfile/UploadProduct/AddNewProduct";
import { TotalSaleIcon } from "@/icons";
import SaleStatsCard from "@/components/shared/UserProfile/Sale-Product/SaleStatsCard";
import PurchaseProductTable from "@/components/shared/UserProfile/Tables/PurchaseProductTable";

const saleState = [
    {
      icon: <TotalSaleIcon />,
      title: "Total Purchase Item",
      value: "8",
    },
  ];

const PurchaseProductPage = () => {
  return (
    <Container className="md:space-y-8 space-y-5">
      <AddNewProduct link="/individual-user/dashboard/uploaded-products-list/add-product" />
      <UploadProductDataFilterOptionAndNav baseLink="/individual-user/dashboard/uploaded-products-list" user="user" />
      <SaleStatsCard data={saleState} />
      <PurchaseProductTable />
    </Container>
  );
};

export default PurchaseProductPage;
