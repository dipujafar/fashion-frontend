import Container from "@/components/shared/Container";
import SaleProductTable from "./_components/SaleProductTable";
import AddNewProduct from "../_components/AddNewProduct";


const SalePage = () => {
    return (
        <Container className='md:space-y-8 space-y-5'>
            <AddNewProduct/>
           <SaleProductTable/>
        </Container>
    );
};

export default SalePage;