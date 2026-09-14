import React from 'react'
import PurchaseProductContainer from '@/components/shared/UserProfile/PurchaseProd/PurchaseProductContainer';

async function PurchaseOrdersPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
    const ssp = await searchParams;

    return (
        <div className="space-y-5">

            <div className='mt-5'>
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-foreground">Purchase Orders</h2>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                    Track every order you've placed for products you want to buy.
                </p>
            </div>

            <PurchaseProductContainer ssp={ssp} />
        </div>
    )
}

export default PurchaseOrdersPage