import { ProductGridSkeleton } from '@/components/skeletons/ProductsCardSkeleton'
import React from 'react'

function ProductLoading() {
    return <div>
        <div className='hidden xl:block'>
            <ProductGridSkeleton length={6} />
        </div>
        <div className='hidden lg:block xl:hidden'>
            <ProductGridSkeleton length={5} />
        </div>
        <div className='hidden md:block lg:hidden'>
            <ProductGridSkeleton length={4} />
        </div>
        <div className='block md:hidden'>
            <ProductGridSkeleton length={2} />
        </div>
    </div>
}

export default ProductLoading