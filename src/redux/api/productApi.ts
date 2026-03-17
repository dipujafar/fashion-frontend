import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.product],
    }),
    getProducts: builder.query({
      query: (params) => ({
        url: "/products",
        method: "GET",
        params,
      }),
      providesTags: (result) => {
        const items = result?.data?.data ?? result ?? [];
        return [
          ...items.map(({ id }: { id: string }) => ({
            type: tagTypes.product,
            id,
          })),
          { type: tagTypes.product, id: "LIST" },
        ];
      },
    }),
  }),
});

export const { useCreateProductMutation, useGetProductsQuery } = productApi;
