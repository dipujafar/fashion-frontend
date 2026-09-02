import Link from 'next/link';
import React from 'react'
import OrdersContainer from './_components/OrdersContainer';
import { Button } from '@/components/ui/button';

async function OrdersPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
    const ssp = await searchParams;

    return (
        <div className="space-y-5">

            <div className="w-full rounded border border-slate-200 bg-white px-6 py-5">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-900">
                            Product Sell Orders
                        </h2>
                        <p className="mt-0.5 text-sm text-slate-600">
                            Track every listing you've put up for sale
                        </p>
                    </div>

                    <Link href={"/sell"}>
                        <Button className="w-full rounded-none cursor-pointer">SELL NOW</Button>
                    </Link>
                </div>
            </div>


            <OrdersContainer ssp={ssp} />
        </div>
    )
}

export default OrdersPage;