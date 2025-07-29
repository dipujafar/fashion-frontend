import Container from "@/components/shared/Container";
import SaleProductTable from "../../../../../components/shared/UserProfile/Sale-Product/SaleProductTable";
import AddNewProduct from "../../../../../components/shared/UserProfile/UploadProduct/AddNewProduct";
import UploadProductDataFilterOptionAndNav from "@/components/shared/UserProfile/UploadProduct/UploadedProductListDataTable/UploadProductDataFilterOptionAndNav";

const SalePage = () => {
  return (
    <Container className="md:space-y-8 space-y-5">
      <AddNewProduct link="/individual-user/uploaded-products-list/add-product" />
      <UploadProductDataFilterOptionAndNav
        baseLink="/individual-user/uploaded-products-list"
        user="user"
      />
      <SaleProductTable />
    </Container>
  );
};

export default SalePage;
