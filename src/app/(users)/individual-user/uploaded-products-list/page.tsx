import React from 'react';
import AddNewProduct from './_components/AddNewProduct';
import Container from '@/components/shared/Container';
import UploadedProductListTable from './_components/UploadedProductListTable';

const UploadedProductList = () => {
    return (
        <Container className='md:space-y-8 space-y-5'>
            <AddNewProduct/>
            <UploadedProductListTable/>
        </Container>
    );
};

export default UploadedProductList;