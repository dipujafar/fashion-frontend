import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
      providesTags: [tagTypes.category],
    }),
    getCategorySize: builder.query({
      query: (id) => ({
        url: `/category/sizes/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.category],
    }),
    getCategoryBrands: builder.query({
      query: (id) => ({
        url: `/category/brands/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.category],
    })
  }),
});

export const { useGetCategoryQuery, useGetCategorySizeQuery, useGetCategoryBrandsQuery } = categoryApi;
