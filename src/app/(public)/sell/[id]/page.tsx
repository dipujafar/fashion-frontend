import GetProductDetails from '@/lib/services/ProductDetails';
import React from 'react'
import { IProductWithUser } from '../../shop/[productId]/_components/ProductDetails/ProductDetails';
import { notFound } from 'next/navigation';
import Container from '@/components/shared/Container';
import EditlistingForm from './_components/EditlistingForm';

export const metadata = {
    title: "Edit Sell Item",
    description: "Edit your sell item with Fashion!",
}

async function EditSalePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const detail = await GetProductDetails({ id }) as { data: IProductWithUser };

    if (!detail?.data) {
        return notFound();
    }

    return (
        <Container>
            <EditlistingForm product={detail?.data} />
        </Container>
    )
}

export default EditSalePage