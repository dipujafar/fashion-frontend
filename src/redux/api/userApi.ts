import { IBillingDetails } from "@/types";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCharities: builder.query({
            query: () => ({
                url: "/users/charities",
                method: "GET",
            }),
            providesTags: [tagTypes.user],
        }),
        defaultBillingDetails: builder.query<{ data: IBillingDetails | null }, void>({
            query: () => ({
                url: "/users/billing-details",
                method: "GET",
            }),
            providesTags: [tagTypes.user_billing],
        }),
        updateBillingDetails: builder.mutation<{ data: IBillingDetails | null }, IBillingDetails>({
            query: (payload) => ({
                url: "/users/billing-details",
                method: "PUT",
                body: payload
            }),
            invalidatesTags: [tagTypes.user_billing],
        })
    }),
})

export const { useGetCharitiesQuery, useDefaultBillingDetailsQuery, useUpdateBillingDetailsMutation } = userApi;