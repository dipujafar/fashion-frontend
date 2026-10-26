import { GetProductsByMember } from '@/lib/services/Products';
import React from 'react'
import ProductsDonation from './ProductsDonation';
import DonationProductCard from './DonationproductCard';
import MoreProductsDailog from './MoreProductsDailog';

async function ProductsContainer({ userName, }: { userName: string }) {

    const query = {
        allowDonation: "true",
        stock: "on-sale",
        limit: "6"
    }

    const prodData = await GetProductsByMember({ query, userName }) as { data: { data: any[], meta: any } };

    const products = prodData?.data?.data || [];

    return (
        <div className='mt-5'>
            <div className="mb-4 flex items-baseline justify-between flex-wrap gap-y-2">
                <h3 className="text-lg font-semibold text-foreground">Active Listing Supporting Charity</h3>

                {<MoreProductsDailog initialData={prodData?.data?.data || []} initialMeta={prodData?.data?.meta || null} query={query} userName={userName} />}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                {products?.map((prod) => (
                    <DonationProductCard data={prod} key={prod?.id} ownProduct={true}></DonationProductCard>
                ))}
            </div>

        </div>
    )
}

export default ProductsContainer
