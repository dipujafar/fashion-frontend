import React, { Suspense } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GetUserBillingDetails } from '@/lib/services/UserDetails';
import EditBillingDetails from './EditBillingDetails';
import { IBillingDetails } from '@/types';

function BillingDetailsServer() {

    const shippingPromise = GetUserBillingDetails();

    return (
        <Card className="w-full border-none p-5 rounded-none gap-3">
            <CardHeader className="px-0">
                <CardTitle className="text-xl font-semibold">
                    Shipping Address
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">

                <Suspense fallback={<div className="flex-center h-40 bg-white">
                    <span className="loaderDark !w-12"> </span>
                </div>}>
                    <BillingDetails detailsPromise={shippingPromise} />
                </Suspense>

            </CardContent>
        </Card>
    )
}

export default BillingDetailsServer;

const BillingDetails = async ({ detailsPromise }: { detailsPromise: Promise<{ data: IBillingDetails | null }> }) => {
    const data = await detailsPromise;

    return (
        <EditBillingDetails data={data} />
    )
}