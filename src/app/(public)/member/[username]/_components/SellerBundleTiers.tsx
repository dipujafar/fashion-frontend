"use client"
import ChoiceBundleModal from '@/components/shared/UserProfile/Modals/ChoiceBundleModal';
import { Skeleton } from '@/components/ui/skeleton';
import { useSellerBundleTiersQuery } from '@/redux/api/userApi'
import React from 'react'

function SellerBundleTiers({ userName }: { userName: string }) {

    const { isLoading, isSuccess, isError, data } = useSellerBundleTiersQuery({ username: userName }, { refetchOnMountOrArgChange: true });

    if (isLoading) {
        return <Skeleton className='h-20 lg:h-24 w-full' />
    }

    return (
        (isSuccess && data?.data?.tiers.length > 0) && <div className="flex justify-between items-center border border-gray-200 rounded-md lg:py-4 py-2 px-5">
            <div>
                <p className="text-lg font-medium">Shop Bundles</p>
                <p className="text-gray-600 text-sm">Get Discount</p>
            </div>
            <ChoiceBundleModal tiers={data?.data?.tiers || []} />
        </div>
    )
}

export default SellerBundleTiers