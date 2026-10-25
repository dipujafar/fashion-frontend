"use client"
import { IMeta, IProduct } from "@/types";
import { useRef } from "react";
import useLazyLoad from "@/hooks/useLazyLoad";
import Image from "next/image";
import { useLazyProductsGetByMemberQuery } from "@/redux/api/productApi";
import DonationProductCard from "./DonationproductCard";

type Props = {
  query: { [key: string]: string | undefined },
  userName: string,
  initialData: IProduct[],
  initialMeta: IMeta,
}

const ProductsDonation = ({ query, userName, initialData, initialMeta }: Props) => {

  const [loadSellerProds, { isLoading }] = useLazyProductsGetByMemberQuery();
  const triggerRef = useRef(null);

  const loadNextPage = async (page: number) => {
    try {

      query.page = page.toString();

      const res = await loadSellerProds({ params: query, userName }).unwrap();
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
        data?.length === 0 && !isLoading && <div className="py-20 md:py-24 lg:py-28 max-w-sm mx-auto">
          <Image src={"/emty-box.png"} unoptimized alt="empty-cart" className="h-16 lg:h-24 w-auto mx-auto" height={500} width={500} />

          <p className="text-center text-gray-900 font-semibold text-base lg:text-xl mb-2">No items available</p>

          <p className="text-center text-gray-700 text-sm lg:text-base">This seller hasn't listed any items yet. Check back later or browse other sellers to find something you like.</p>
        </div>
      }

      {/* ========================= all products ========================== */}
      <div className="grid grid-cols-2 md:grid-cols-3  gap-4">
        {data?.map((prod) => (
          <DonationProductCard data={prod} key={prod?.id} ownProduct={true}></DonationProductCard>
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

export default ProductsDonation;
