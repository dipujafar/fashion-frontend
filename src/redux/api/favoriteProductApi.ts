import { IFavoriteItem } from "@/app/(public)/favourites/_components/WishListContainer";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";
import { IMeta } from "@/types";

const favoriteProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addFavoriteProduct: builder.mutation({
      query: (data) => ({
        url: "/favourites",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_, __, arg) => [
        { type: tagTypes.favorite },
        { type: tagTypes.product, id: arg.productId },
      ],
    }),

    getFavoriteProduct: builder.mutation<{ message: string, data: { data: IFavoriteItem[], meta: IMeta } }, { }>({
      query: (args) => ({
        url: "/favourites",
        method: "GET",
        params: args,
      }),
    }),

    deleteFavoriteProduct: builder.mutation({
      query: (id) => ({
        url: `/favourites/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [
        { type: tagTypes.favorite },
        { type: tagTypes.product, id },
      ],
    }),
  }),
});

export const {
  useAddFavoriteProductMutation,
  useGetFavoriteProductMutation,
  useDeleteFavoriteProductMutation,
} = favoriteProductApi;
