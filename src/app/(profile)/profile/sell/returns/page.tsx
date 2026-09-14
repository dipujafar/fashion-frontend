import React from 'react'
import SellReturnContainer from '@/components/shared/UserProfile/PurchaseReturn/PurchaseReturnContainer';

async function SellerReturnsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
    const ssp = await searchParams;

    return (
        <div className="space-y-5">

            <div className='mt-5'>
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-foreground">Sell Returns</h2>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                    Track every return for your selling products and manage them efficiently.
                </p>
            </div>

            <SellReturnContainer ssp={ssp} />
        </div>
    )
}

export default SellerReturnsPage