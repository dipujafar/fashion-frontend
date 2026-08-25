"use client"
import { IMeta, IProduct } from "@/types";
import ProductCard from "../../Cards/ProductCard";
import { useProductsGetByMemberMutation } from "@/redux/api/productApi";
import { useRef } from "react";
import useLazyLoad from "@/hooks/useLazyLoad";
import Image from "next/image";

const ProductsListContainer = ({ query, userName, initialData, initialMeta }: { query: { [key: string]: string | undefined }, userName: string, initialData: IProduct[], initialMeta: IMeta }) => {

  const [loadFavoriteProds, { isLoading }] = useProductsGetByMemberMutation();
  const triggerRef = useRef(null);

  const loadNextPage = async (page: number) => {
    try {

      query.page = page.toString();

      const res = await loadFavoriteProds({ params: query, userName }).unwrap();
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
          <p className="text-center text-gray-700 text-sm lg:text-lg">No items available</p>
        </div>
      }

      {/* ========================= all products ========================== */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {data?.map((prod) => (
          <ProductCard data={prod} key={prod?.id} ownProduct={true}></ProductCard>
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

export default ProductsListContainer;
