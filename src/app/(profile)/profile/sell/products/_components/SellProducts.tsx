"use client"
import { IMeta } from "@/types";
import { useRef } from "react";
import useLazyLoad from "@/hooks/useLazyLoad";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import SellProdCard, { IProductExtra } from "./SellProdCard";
import { useLazyMyProductsGetQuery } from "@/redux/api/productApi";

const SellProducts = ({ query, initialData, initialMeta }: { query: { [key: string]: string | undefined }, initialData: IProductExtra[], initialMeta: IMeta }) => {

    const [loadSellerProds, { isLoading }] = useLazyMyProductsGetQuery();
    const triggerRef = useRef(null);

    const loadNextPage = async (page: number) => {
        try {

            query.page = page.toString();

            const res = await loadSellerProds({ params: query }).unwrap();
            const data = res?.data?.data || [];
            const meta = res?.data?.meta;

            // No meta or no data back -> treat as end of list
            const hasMore = meta ? meta.page < meta.totalPage : data.length > 0;

            return { data, hasMore };
        } catch (error) {
            return { data: [], hasMore: false };
        }
    }

    const { data, hasMore } = useLazyLoad<IProductExtra>({
        triggerRef,
        onGrabData: loadNextPage,
        options: {},
        initialData: initialData,
        initialPage: initialMeta?.page ? initialMeta.page + 1 : 2,
        initialHasMore: initialMeta ? initialMeta?.page < initialMeta?.totalPage : true
    });

    return (
        <div>

            {
                data?.length === 0 && !isLoading && <div className="py-20 md:py-24 lg:py-28">
                    <Image src={"/emty-box.png"} unoptimized alt="empty-cart" className="h-16 lg:h-24 w-auto mx-auto" height={500} width={500} />
                    <p className="text-center text-gray-700 text-sm lg:text-lg">No items available</p>
                    <Button variant={"default"} className="rounded-none cursor-pointer mx-auto mt-2">List an Item</Button>
                </div>
            }

            {/* ========================= all products ========================== */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 xl:gap-6">
                {data?.map((prod) => (
                    <SellProdCard data={prod} key={prod?.id}></SellProdCard>
                ))}

                {hasMore && <div ref={triggerRef} style={{ height: 1 }} />}
            </div>

            {
                isLoading && hasMore && <div className="flex-center h-28 lg:h-40">
                    <span className="loaderDark !w-10"> </span>
                </div>
            }

        </div>
    );
};


export default SellProducts