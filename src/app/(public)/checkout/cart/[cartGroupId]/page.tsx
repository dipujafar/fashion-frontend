import React from 'react'

import CheckoutItems from './_components/CheckoutItems'
import BillingDetailsServer from './_components/Billing/BillingDetailsServer';
import OrderSummaryCard from './_components/OrderSummaryCard';
import CourierServices from './_components/CourierServices';


async function CheckoutPage({ params }: { params: Promise<{ cartGroupId: string }> }) {
    const { cartGroupId } = await params;
    return (
        <div>
            <div className='max-w-[1400px] text-gray-800 mx-auto px-4 md:px-10  xl:px-28 2xl:px-40'>
                <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-x-5 gap-y-5 justify-center pt-5">

                    <div className='space-y-5'>
                        <CheckoutItems cartGroupId={cartGroupId} />
                        <BillingDetailsServer />
                        <CourierServices cartGroupId={cartGroupId}/>
                    </div>

                    <OrderSummaryCard cartGroupId={cartGroupId} />

                </div>
            </div>
        </div>
    )
}

export default CheckoutPage