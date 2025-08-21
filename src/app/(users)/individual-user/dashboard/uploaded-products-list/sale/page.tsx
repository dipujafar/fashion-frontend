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

const SalePage = () => {
  return (
    <Container className="md:space-y-8 space-y-5">
      <AddNewProduct link="/individual-user/dashboard/uploaded-products-list/add-product" />
      <UploadProductDataFilterOptionAndNav
        baseLink="/individual-user/dashboard/uploaded-products-list"
        user="user"
      />
      <SaleStatsCard data={saleState} />
      <SaleProductTable />
    </Container>
  );
};

export default SalePage;
