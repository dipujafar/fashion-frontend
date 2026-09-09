"use client";
import PProductCard from "@/components/shared/Cards/PProductCard";
import useLazyLoad from "@/hooks/useLazyLoad";
import { useLazyGetProductsQuery } from "@/redux/api/productApi";
import { IMeta, IProduct } from "@/types";
import Image from "next/image";
import { useRef } from "react";

const AllProducts = ({ query, initialData, initialMeta }: { query: { [key: string]: string | undefined }, initialData: IProduct[], initialMeta: IMeta }) => {

  const [loadProds, { isLoading }] = useLazyGetProductsQuery();
  const triggerRef = useRef(null);

  const loadNextPage = async (page: number) => {
    try {

      query.page = page.toString();

      const res = await loadProds(query).unwrap();
      const data = res?.data?.data || [];
      const meta = res?.data?.meta;

      // No meta or no data back -> treat as end of list
      const hasMore = meta ? meta.page < meta.totalPage : data.length > 0;

      return { data, hasMore };
    } catch (error) {
      return { data: [], hasMore: false };
    }
  }

  const { data, hasMore } = useLazyLoad<IProduct>({
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
          <p className="text-lg font-semibold text-center">Sorry, we couldn't find anything</p>
          <p className="text-center text-gray-700 text-sm lg:text-base">{Object.keys(query).length > 0 ? "No items match by your filter" : "No items available."}</p>
        </div>
      }

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {data?.map((product) => (
          <PProductCard data={product} key={product.id}></PProductCard>
        ))}

        {hasMore && <div ref={triggerRef} style={{ height: 1 }} />}

      </div>

    </div>
  );
};

export default AllProducts;
