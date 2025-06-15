import Container from "@/components/shared/Container";
import AddNewProduct from "../_components/AddNewProduct";
import PurchaseProductTable from "./_components/PurchaseProductTable";

const PurchaseProductPage = () => {
  return (
    <Container className="md:space-y-8 space-y-5">
      <AddNewProduct />
      <PurchaseProductTable />
    </Container>
  );
};

export default PurchaseProductPage;
