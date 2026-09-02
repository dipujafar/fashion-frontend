import React from 'react'
import SellProducts from './SellProducts'
import { IMeta } from '@/types'
import { IProductExtra } from './SellProdCard';

async function SellProductsContainer({
    prodPromise,
    query
}:
    {
        prodPromise: Promise<{ data: { data: IProductExtra[], meta: IMeta } }>,
        query: { [key: string]: string | undefined }
    }) {

    const prods = await prodPromise;

    return (
        <div>
            <SellProducts initialData={prods?.data?.data} initialMeta={prods?.data?.meta} query={query} key={Date.now()} />
        </div>
    )
}

export default SellProductsContainer