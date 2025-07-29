import Container from "@/components/shared/Container";
import PurchaseProductTable from "./_components/PurchaseProductTable";
import UploadProductDataFilterOptionAndNav from "@/components/shared/UserProfile/UploadProduct/UploadedProductListDataTable/UploadProductDataFilterOptionAndNav";
import AddNewProduct from "@/components/shared/UserProfile/UploadProduct/AddNewProduct";

const PurchaseProductPage = () => {
  return (
    <Container className="md:space-y-8 space-y-5">
      <AddNewProduct link="/individual-user/uploaded-products-list/add-product" />
      <UploadProductDataFilterOptionAndNav baseLink="/individual-user/uploaded-products-list" user="user" />
      <PurchaseProductTable />
    </Container>
  );
};

export default PurchaseProductPage;
