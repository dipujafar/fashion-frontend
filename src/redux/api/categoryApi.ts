import { ICategory } from "@/types";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";
import { Category } from "@/components/shared/UserProfile/AddProduct/Categories/CategoryFilterSelector";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query<{ data: Category[] }, void>({
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
