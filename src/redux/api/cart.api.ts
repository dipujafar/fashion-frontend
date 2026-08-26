import { IProduct } from "@/types";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const cartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSingleSellerCartItems: builder.query<{
            data: {
                items: { product: IProduct, id : string }[]
                subTotal: number,
                total: number,
                bundleDiscountPercent: number,
                bundleDiscountAmount: number,
                cartGroupId : string | null
            }
        }, { sellerUserName: string }>({
            query: ({ sellerUserName }) => ({
                url: `/carts/by-seller/${sellerUserName}`,
                method: "GET",
            }),
            providesTags: [tagTypes.cart],
        }),

    }),
});

export const { useGetSingleSellerCartItemsQuery } = cartApi;
