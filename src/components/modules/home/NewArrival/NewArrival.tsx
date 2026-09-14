import GetNewArrivalProds from '@/lib/services/NewArrivalProducts';
import React, { Suspense } from 'react'
import { IProduct } from '@/types';
import { ProductGridSkeleton } from '@/components/skeletons/ProductsCardSkeleton';
import PreviewProduct from '@/components/shared/DisplayProductSection/PreviewProduct';

function NewArrival() {
    const prodPromise = GetNewArrivalProds();

    return (
        <Suspense fallback={<ProductGridSkeleton />}>
            <Products prodPromise={prodPromise} />
        </Suspense>
    )
}

export default NewArrival;

const Products = async ({ prodPromise }: { prodPromise: Promise<{ data: IProduct[] }> }) => {
    const { data } = await prodPromise;

    return <PreviewProduct productData={data}></PreviewProduct>
}