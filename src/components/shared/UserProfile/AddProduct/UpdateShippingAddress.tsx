"use client"
import UpdateSellingAddress from '@/app/(profile)/profile/address/_components/UpdateSellingAddress';
import { Skeleton } from '@/components/ui/skeleton';
import { useUserAddressesQuery } from '@/redux/api/userApi';
import { Pencil } from 'lucide-react';
import React, { useState } from 'react'

function UpdateShippingAddress() {
    const { isLoading, isSuccess, isError, data: response } = useUserAddressesQuery();

    const sellingAddress = response?.data?.sellingAddress

    const data = {
        data: sellingAddress || null
    }

    const locationParts = [
        data?.data?.zip_code,
        data?.data?.state,
        data?.data?.city,
        data?.data?.country,
    ].filter(Boolean);

    const locationLine = locationParts.join(", ");

    return (
        <>
            {
                isLoading ? <Skeleton className='w-full h-20' /> : isSuccess && response?.data ? (
                    <UpdateSellingAddress defaultdata={sellingAddress || null} className='w-full' actionBtn={<div
                        className='p-5 border border-gray-200 rounded-lg relative hover:bg-gray-50 duration-150 cursor-pointer w-full'
                    >
                        {data?.data ? (
                            <>
                                {data?.data?.full_name && (
                                    <h5 className='text-lg font-semibold'>{data.data.full_name}</h5>
                                )}
                                {data?.data?.contact && (
                                    <p className='text-gray-600'>{data.data.contact}</p>
                                )}
                                {data?.data?.address1 && (
                                    <p className='text-gray-600'>{data.data.address1}</p>
                                )}
                                {locationLine && (
                                    <p className='text-gray-600'>{locationLine}</p>
                                )}
                                {/* If no fields exist at all, show a prompt */}
                                {!data?.data?.full_name &&
                                    !data?.data?.contact &&
                                    !data?.data?.address1 &&
                                    !locationLine && (
                                        <p className='text-base text-gray-600'>Add Address</p>
                                    )}
                            </>
                        ) : (
                            <p className='text-base text-gray-600'>Add Address</p>
                        )}

                        <Pencil className='text-gray-600 absolute top-2 md:top-3 lg:top-4 right-2 md:right-3 lg:right-4 size-5' />
                    </div>} />
                ) : <></>
            }
        </>
    )
}

export default UpdateShippingAddress