import React from 'react'
import BillingDetailsServer from '../../cart/[cartGroupId]/_components/Billing/BillingDetailsServer';
import ProductCheckoutItems from './_components/ProductCheckoutItems';
import ProductCourierServices from './_components/ProductCourierServices';
import ProductSummaryCard from './ProductSummeryCard';

async function ProductCheckoutPage({ params }: { params: Promise<{ productId: string }> }) {
    const { productId } = await params;
    return (
        <div>
            <div className='max-w-[1400px] text-gray-800 mx-auto px-4 md:px-10  xl:px-28 2xl:px-40'>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 justify-center pt-5">

                    <div className='space-y-5'>
                        <ProductCheckoutItems productId={productId} />
                        <BillingDetailsServer />
                        <ProductCourierServices productId={productId} />
                    </div>

                    <ProductSummaryCard productId={productId} />

                </div>
            </div>
        </div>
    )
}

export default ProductCheckoutPage