"use client"
import ChoiceBundleModal from '@/components/shared/UserProfile/Modals/ChoiceBundleModal';
import { Skeleton } from '@/components/ui/skeleton';
import { useSellerBundleTiersQuery } from '@/redux/api/userApi'
import React from 'react'

function SellerBundleTiers({ userName, isShowBtn = false }: { userName: string, isShowBtn?: boolean }) {

    const { isLoading, isSuccess, isError, data } = useSellerBundleTiersQuery({ username: userName }, { refetchOnMountOrArgChange: true });

    if (isLoading) {
        if (isShowBtn) {
            return <Skeleton className='h-8 w-12' />
        } else return <Skeleton className='h-20 lg:h-24 w-full' />
    }

    return (
        isShowBtn ? <ChoiceBundleModal tiers={data?.data?.tiers || []} userName={userName} btnTxt='Discount tiers' /> : (isSuccess && data?.data?.tiers.length > 0) && <div className="flex justify-between items-center border border-gray-200 rounded lg:py-4 py-2.5 px-3">
            <div>
                <p className="text-base lg:text-lg font-semibold">Shop Bundles</p>
                <p className="text-gray-600 text-xs md:text-sm">Get Discount</p>
            </div>
            <ChoiceBundleModal tiers={data?.data?.tiers || []} userName={userName} btnTxt={"Create Bundle"} />
        </div>
    )
}

export default SellerBundleTiers