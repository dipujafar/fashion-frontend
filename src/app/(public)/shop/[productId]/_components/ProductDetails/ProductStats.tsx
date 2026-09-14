"use client";
import React from 'react'
import FavouritesWithServer from '../FavouritesWithServer'
import { IProduct } from '@/types'
import { useGetProductStatsQuery } from '@/redux/api/productApi';
import { Skeleton } from '@/components/ui/skeleton';
import { CartIcon, OfferIcon2 } from "@/icons";
import { BadgePercent } from "lucide-react";



function ProductStats({ product, isMyProduct }: { product: IProduct; isMyProduct: boolean }) {
    const { isLoading, isSuccess, data } = useGetProductStatsQuery({ productId: product?.id }, { skip: !product?.id });

    return (
        <div className="flex justify-between items-center gap-x-3 relative">

            {
                isLoading ? <div className="flex flex-row gap-x-2 items-center">
                    <Skeleton className="w-32 h-9 rounded-none" />
                    <Skeleton className="w-32 h-9 rounded-none" />
                </div> : isSuccess ? <div className="flex flex-row gap-x-2 items-center">

                    {data?.data?._count?.offerItems > 0 && <div className="flex flex-row gap-x-1 items-center bg-zinc-200 px-2.5 py-1 rounded-full">
                        <BadgePercent className="size-5" />
                        <p className="text-sm text-gray-800">
                            {data?.data?._count?.offerItems} offer sent
                        </p>
                    </div>}
                    {data?.data?._count?.cartItems > 0 && <div className="flex flex-row gap-x-1 items-center bg-zinc-200 px-2.5 py-1 rounded-full">
                        <CartIcon className="!size-5" />
                        <p className="text-sm text-gray-800">
                            In {data?.data?._count?.cartItems} persons bag
                        </p>
                    </div>}
                </div> : <></>
            }

            {/* ===================== favorite button ================ */}
            {isSuccess && <FavouritesWithServer id={product?.id} count={data?.data?._count?.favourites} includedProduct={product?.favourites} isMyProduct={isMyProduct}></FavouritesWithServer>}

        </div>
    )
}

export default ProductStats