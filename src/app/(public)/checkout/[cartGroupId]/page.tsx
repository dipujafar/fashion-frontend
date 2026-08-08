import React from 'react'
import OrderSummaryCard from '../../shopping-cart/_components/OrderSummaryCard'
import CheckoutItems from './_components/CheckoutItems'
import BillingDetailsServer from '../../shopping-cart/shopping/_components/Billing/BillingDetailsServer'

async function CheckoutPage({ params }: { params: Promise<{ cartGroupId: string }> }) {
    const { cartGroupId } = await params;
    return (
        <div>
            <div className='max-w-7xl text-gray-800 mx-auto px-4 md:px-10  xl:px-28 2xl:px-40'>
                <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-x-5 gap-y-5 justify-center pt-5">

                    <div className='space-y-5'>
                        <CheckoutItems cartGroupId={cartGroupId} />
                        <BillingDetailsServer />
                    </div>

                    <OrderSummaryCard cartGroupId={cartGroupId} />

                </div>
            </div>
        </div>
    )
}

export default CheckoutPage