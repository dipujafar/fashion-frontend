import React, { Suspense } from 'react'
import { IProduct } from '@/types';
import { ProductGridSkeleton } from '@/components/skeletons/ProductsCardSkeleton';
import PreviewProduct from '@/components/shared/DisplayProductSection/PreviewProduct';
import GetRecommendedProds from '@/lib/services/Recommended';

function RecommendedProds() {
    const prodPromise = GetRecommendedProds();

    return (
        <Suspense fallback={<ProductGridSkeleton />}>
            <Products prodPromise={prodPromise} />
        </Suspense>
    )
}

export default RecommendedProds;

const Products = async ({ prodPromise }: { prodPromise: Promise<{ data: IProduct[] }> }) => {
    const { data } = await prodPromise;

    return <PreviewProduct productData={data}></PreviewProduct>
}