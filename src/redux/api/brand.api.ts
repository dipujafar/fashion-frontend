import { IBrand } from "@/types";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";
import { Category } from "@/components/shared/UserProfile/AddProduct/Categories/CategoryFilterSelector";

const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query<{ data: IBrand[] }, {}>({
      query: (query) => ({
        url: "/brands",
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.brand],
    }),

  }),
});

export const { useGetBrandsQuery } = brandApi;
