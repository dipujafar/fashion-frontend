import React from 'react'
import ProductCard from '../../Cards/ProductCard'
import { IMeta, IProduct } from '@/types'

async function MemberProds({ prodPromise }: { prodPromise: Promise<{ data: { data: IProduct[], meta: IMeta } }>}) {
    
    const result = await prodPromise;

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  gap-4 xl:gap-6 ">
            {result?.data?.data?.map((prod) => (
                <ProductCard data={prod} key={prod?.id} ownProduct={true}></ProductCard>
            ))}
        </div>
    )
}

export default MemberProds