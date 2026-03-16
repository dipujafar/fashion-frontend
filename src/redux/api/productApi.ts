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
      providesTags: [tagTypes.product],
    }),
  }),
});

export const { useCreateProductMutation, useGetProductsQuery } = productApi;
