import React, { Suspense } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Truck } from 'lucide-react';
import { getCheckoutShippingRates } from '@/lib/services/Cartprods';
import { ICourierServiceRates } from '@/types';
import CourierServiceCards from './CourierServiceCards';


function CourierServices({ cartGroupId }: { cartGroupId: string }) {
    const shipingsPromise = getCheckoutShippingRates({ cartGroupId });
    return (
        <Card className=" hover:border hover:border-primary-color/50 duration-300 text-black h-fit rounded-none gap-3">
            <CardHeader className="mb-0">
                <CardTitle className="font-semibold text-lg flex flex-row items-center gap-2">
                    <Truck />
                    Shipping & Courier Services
                </CardTitle>

            </CardHeader>
            <CardContent className="pt-0">

                <Suspense fallback={<div className="flex-center h-40 bg-white">
                    <span className="loaderDark !w-10"> </span>
                </div>}>
                    <ShippingServices shippingPromise={shipingsPromise} cartGroupId={cartGroupId} />
                </Suspense>

            </CardContent>

        </Card>
    )
}

export default CourierServices;

const ShippingServices = async ({ shippingPromise, cartGroupId }: { shippingPromise: Promise<{ data?: { rates: ICourierServiceRates[] } | null }>; cartGroupId: string }) => {

    const data = await shippingPromise;

    if (!data?.data?.rates) {
        return (
            <div className="flex-center h-28 bg-white">
                <p className="text-gray-500">Make sure to enter your shipping details.</p>
            </div>
        )
    }

    return (
        <div className="">
            <CourierServiceCards rates={data?.data?.rates} cartGroupId={cartGroupId} />
        </div>
    )
}