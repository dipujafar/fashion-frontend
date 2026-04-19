import React, { Suspense } from 'react'
import { IProduct } from '@/types';
import { ProductGridSkeleton } from '@/components/skeletons/ProductsCardSkeleton';
import PreviewProduct from '@/components/shared/DisplayProductSection/PreviewProduct';
import GetRecentViewProds from '@/lib/services/RecentView';

function RecentView() {
    const prodPromise = GetRecentViewProds();

    return (
        <Suspense fallback={<ProductGridSkeleton />}>
            <Products prodPromise={prodPromise} />
        </Suspense>
    )
}

export default RecentView;

const Products = async ({ prodPromise }: { prodPromise: Promise<{ data: { product: IProduct }[] }> }) => {
    const { data } = await prodPromise;

    return <PreviewProduct productData={data.map(i => i?.product)}></PreviewProduct>
}