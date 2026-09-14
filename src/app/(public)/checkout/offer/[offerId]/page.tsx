import React from 'react'
import BillingDetailsServer from '../../cart/[cartGroupId]/_components/Billing/BillingDetailsServer';
import OfferCourierServices from './_components/CourierServices';
import OfferCheckoutItems from './_components/OfferCheckoutItems';
import OfferSummaryCard from './_components/OfferSummaryCard';

async function OffferPage({ params }: { params: Promise<{ offerId: string }> }) {
    const { offerId } = await params;
    return (
        <div>
            <div className='max-w-[1400px] text-gray-800 mx-auto px-4 md:px-10  xl:px-28 2xl:px-40'>
                <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-x-5 gap-y-5 justify-center pt-5">

                    <div className='space-y-5'>
                        <OfferCheckoutItems offerId={offerId} />
                        <BillingDetailsServer />
                        <OfferCourierServices offerId={offerId} />
                    </div>

                    <OfferSummaryCard offerId={offerId} />

                </div>
            </div>
        </div>
    )
}

export default OffferPage