"use client"
import { useDefaultBillingDetailsQuery } from '@/redux/api/userApi'
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil } from 'lucide-react';
import BillingAddressModal from './BillingAddressModal';
import { Skeleton } from '@/components/ui/skeleton';
import { IBillingDetails } from '@/types';

function BillingDetailsContainer() {
    const { isLoading, isSuccess, data } = useDefaultBillingDetailsQuery();
    const [showEditAddress, setShowEditAddress] = useState<boolean>(false);

    return (
        <Card className="w-full border-none shadow-none py-0 mt-10">
            <CardHeader className="px-0">
                <CardTitle className="text-2xl font-semibold">
                    Billing Address
                </CardTitle>
            </CardHeader>
            <CardContent className="px-0">

                {
                    isLoading && <Skeleton className='h-28 w-full bg-gray-200' />
                }

                <div onClick={() => {
                    setShowEditAddress(true)
                }} className='p-5 border border-gray-200 rounded-lg relative hover:bg-gray-50 duration-150 cursor-pointer'>

                    {isSuccess ? <>
                        <h5 className='text-lg font-semibold'>{data?.data?.full_name}</h5>
                        <p className='text-gray-600'>{data?.data?.contact}</p>
                        <p className='text-gray-600'>{data?.data?.address1}</p>
                        <p className='text-gray-600'>
                            <span>{data?.data?.zip_code}, </span>
                            <span>{data?.data?.state}, </span>
                            <span>{data?.data?.city}, </span>
                            <span>{data?.data?.country}</span>
                        </p>
                    </> : <p className='text-base text-gray-600'>Add Billing Details</p>}

                    <Pencil className='text-gray-600 absolute top-2 md:top-3 lg:top-4 right-2 md:right-3 lg:right-4 size-5' />

                </div>

                {<BillingAddressModal open={showEditAddress} onOpenChange={setShowEditAddress} defaultValue={data?.data || null} />}

            </CardContent>
        </Card>
    )
}

export default BillingDetailsContainer