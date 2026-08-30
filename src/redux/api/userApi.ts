import { Addresses, IBandleTier, IBillingDetails, IUser } from "@/types";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getCharities: builder.query<{ data: IUser[] }, void>({
            query: () => ({
                url: "/users/charities",
                method: "GET",
            }),
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
        }),

        userAddresses: builder.query<{ data: Addresses }, void>({
            query: () => ({
                url: "/users/addresses",
                method: "GET",
            }),
            providesTags: [tagTypes.user_billing],
        }),

        sellerBundleTiers: builder.query<{ data: { tiers: IBandleTier[] } }, { username: string }>({
            query: ({ username }) => ({
                url: `/users/bundle-discount-tiers/${username}`,
                method: "GET",
            }),
        }),

        getUserByUsername: builder.query<{ data: { user: IUser, review: { _avg: { rating: number } } } }, { username: string }>({
            query: ({ username }) => ({
                url: `/users/${username}`,
                method: "GET",
            }),
        }),

    }),
})

export const { useGetCharitiesQuery, useDefaultBillingDetailsQuery, useUpdateBillingDetailsMutation, useSellerBundleTiersQuery, useUserAddressesQuery, useGetUserByUsernameQuery } = userApi;