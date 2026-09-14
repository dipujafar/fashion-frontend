import { ISize } from "@/types";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const sizeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSizes: builder.query<{ data: ISize[] }, {}>({
            query: (query) => ({
                url: "/sizes",
                method: "GET",
                params : query
            }),
            providesTags: [tagTypes.size],
        }),

    }),
});

export const { useGetSizesQuery } = sizeApi;
