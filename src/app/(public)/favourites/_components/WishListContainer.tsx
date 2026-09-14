"use client"
import { IMeta, IProduct } from "@/types"
import FavouriteProdCard from "./FavouriteProdCard";
import { useRef } from "react";
import useLazyLoad from "@/hooks/useLazyLoad";
import { useGetFavoriteProductMutation } from "@/redux/api/favoriteProductApi";
import Image from "next/image";

export type IFavoriteItem = { id: string, product: IProduct }

export default function WishListContainer({
    favoriteProds,
    initialMeta,
}: {
    favoriteProds: IFavoriteItem[];
    initialMeta?: IMeta;
}) {
    const [loadFavoriteProds, { isLoading }] = useGetFavoriteProductMutation();
    const triggerRef = useRef(null);

    const loadNextPage = async (page: number) => {
        try {
            const res = await loadFavoriteProds({ page }).unwrap();
            const data = res?.data?.data || [];
            const meta = res?.data?.meta;

            // No meta or no data back -> treat as end of list
            const hasMore = meta ? meta.page < meta.totalPage : data.length > 0;

            return { data, hasMore };
        } catch (error) {
            return { data: [], hasMore: false };
        }
    }

    const { data, loading, hasMore } = useLazyLoad<IFavoriteItem>({
        triggerRef,
        onGrabData: loadNextPage,
        options: {},
        initialData: favoriteProds,
        initialPage: 2,
        initialHasMore: initialMeta ? initialMeta?.page < initialMeta?.totalPage : true,
    });

    return (
        <div>

            {
                data?.length === 0 && !loading && <div className="py-20 md:py-24 lg:py-28 space-y-2">
                    <Image src={"/Heart.gif"} unoptimized alt="empty-cart" className="h-16 lg:h-20 w-auto mx-auto" height={500} width={500} />
                    <p className="text-center text-gray-500 text-sm lg:text-base">No products in favourites</p>
                </div>
            }

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 pt-5 md:pt-8'>
                {
                    data?.map((item) => {
                        return <FavouriteProdCard key={item?.id} favoriteItem={item} />
                    })
                }

                {hasMore && <div ref={triggerRef} style={{ height: 1 }} />}
            </div>

            {
                isLoading && hasMore && <div className="flex-center h-28 lg:h-40">
                    <span className="loaderDark !w-10"> </span>
                </div>
            }
        </div>
    )
}