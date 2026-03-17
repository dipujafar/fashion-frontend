"use client";
import React from "react";
import { WishListCardForMobile } from "./WishListCardForMobile";
import { IWishListData } from "@/types";
import WishlistMobileSkeleton from "@/components/skeletons/WishlistMobileSkeleton";
import Empty from "@/components/ui/empty";

export default function WishListMobileContainer({ data, loading, deleteWishListProduct }: { data: IWishListData[], loading: boolean, deleteWishListProduct: (id: string) => void }) {
  if (loading) return <WishlistMobileSkeleton />
  if (data?.length === 0) return <div className="min-h-[calc(100vh-450px)] flex-center"> <Empty message="No Favorite Product" /></div>

  return (
    <div className="max-w-2xl mx-auto mt-2">
      <div className="flex-between">
        <h1 className="text-xl font-medium text-muted-foreground">Wishlist</h1>
        <p className="text-lg font-medium text-">{data?.length} Items</p>
      </div>
      <div className="space-y-4 mt-2">
        {data?.map((product: IWishListData) => (
          <WishListCardForMobile key={product?.id} product={product} deleteWishListProduct={deleteWishListProduct} />
        ))}
      </div>
    </div>
  );
}
