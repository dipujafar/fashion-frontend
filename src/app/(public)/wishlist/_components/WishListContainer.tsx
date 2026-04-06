"use client";
import Container from '@/components/shared/Container'
import React from 'react'
import WishListMobileContainer from './wishListForMobile/WishListMobileContainer'
import WishListTable from './WishListTable'
import { useDeleteFavoriteProductMutation, useGetFavoriteProductQuery } from '@/redux/api/favoriteProductApi'
import { toast } from 'sonner';

export default function WishListContainer() {
    const { data: wishListData, isLoading } = useGetFavoriteProductQuery(undefined);
    const [deleteWishlistProduct, { isLoading: isDeleting }] = useDeleteFavoriteProductMutation();

    const deleteWishListProduct = async (id: string) => {
        if (isDeleting) return;
        toast.loading("Removing...", { id });
        try {
            await deleteWishlistProduct(id).unwrap();
            toast.success("Removed", { id });
        }
        catch (error: any) {
            toast.error(error?.data?.message);
            toast.dismiss(id);
        }
    };

    return (
        <Container>
            <div className="md:hidden">
                <WishListMobileContainer data={wishListData?.data} loading={isLoading} deleteWishListProduct={deleteWishListProduct} />
            </div>
            <div className="hidden md:block">
                <WishListTable data={wishListData?.data} loading={isLoading} deleteWishListProduct={deleteWishListProduct} />
            </div>
        </Container>
    )
}
