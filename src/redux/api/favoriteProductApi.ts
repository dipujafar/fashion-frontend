import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

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
    getFavoriteProduct: builder.query({
      query: () => ({
        url: "/favourites",
        method: "GET",
      }),
      providesTags: [tagTypes.favorite, tagTypes.product],
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
  useGetFavoriteProductQuery,
  useDeleteFavoriteProductMutation,
} = favoriteProductApi;
