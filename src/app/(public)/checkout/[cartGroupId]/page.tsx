import React from 'react'
import OrderSummaryCard from '../../shopping-cart/_components/OrderSummaryCard'
import DonationCard from '../../shopping-cart/_components/DonationCard'
import BillingDetailsContainer from '../../shopping-cart/shopping/_components/Billing/BillingDetailsContainer'
import CheckoutItems from './_components/CheckoutItems'

async function CheckoutPage({ params }: { params: Promise<{ cartGroupId: string }> }) {
    const { cartGroupId } = await params;
    return (
        <div>
            <div className='max-w-7xl text-gray-800 mx-auto px-4 md:px-10  xl:px-28 2xl:px-40'>
                <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-x-7 gap-y-5  justify-center">

                    <div className="">


                        <div className='mt-10 space-y-8'>
                            <CheckoutItems cartGroupId={cartGroupId} />
                            <div className="">
                                <BillingDetailsContainer />
                            </div>
                        </div>

                    </div>

                    <div className="space-y-4">
                        <OrderSummaryCard />
                        <DonationCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage