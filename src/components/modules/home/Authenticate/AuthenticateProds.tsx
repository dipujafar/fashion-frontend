
import React, { Suspense } from 'react'
import { IProduct } from '@/types';
import { ProductGridSkeleton } from '@/components/skeletons/ProductsCardSkeleton';
import PreviewProduct from '@/components/shared/DisplayProductSection/PreviewProduct';
import { GetAuthenticProducts } from '@/lib/services/Products';
import Container from '@/components/shared/Container';

function AuthenticateProds() {
    const prodPromise = GetAuthenticProducts({ query: { limit: "20" } });

    return (
        <Suspense fallback={<ProductGridSkeleton />}>
            <Products prodPromise={prodPromise} />
        </Suspense>
    )
}

const Products = async ({ prodPromise }: { prodPromise: Promise<{ data: IProduct[] }> }) => {
    const { data } = await prodPromise;

    return data?.length ? (
        <Container>

            <div className="flex justify-between items-center gap-x-4 mb-4">
                <h4 className="text-2xl font-semibold">Authentic Items</h4>
            </div>

            <PreviewProduct productData={data}></PreviewProduct>

        </Container>
    ) : <></>
}

export default AuthenticateProds