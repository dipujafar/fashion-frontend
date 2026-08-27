import { GetProductsByMember } from '@/lib/services/Products';
import React from 'react'
import ItemsLazyItems from './ItemsLazyItems';

async function BundleItems({ userName }: { userName: string }) {

    const prodData = await GetProductsByMember({ query: { showItemInCart: "true" }, userName });

    return <ItemsLazyItems initialData={prodData?.data?.data} initialMeta={prodData?.data?.meta} query={{ showItemInCart: "true" }} userName={userName} />
}

export default BundleItems