import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const userApi= baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCharities: builder.query({
            query: () => ({
                url: "/users/charities",
                method: "GET",
            }),
            providesTags: [tagTypes.user],
        })
    }),
})

export const { useGetCharitiesQuery } = userApi