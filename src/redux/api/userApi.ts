import { Addresses, IBandleTier, IBillingDetails, IFolow, IMeta, IUser } from "@/types";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        balance: builder.query<{ data: { balance: number } }, void>({
            query: () => ({
                url: "/account/balance",
                method: "GET",
            }),
        }),

        accountData : builder.query<{ data: { account_last_num: string } | null }, void>({
            query: () => ({
                url: "/account/account-data",
                method: "GET",
            }),
        }),

        connectAccount: builder.mutation<{ data: { url: string } }, void>({
            query: (payload) => ({
                url: "/account/connect",
                method: "PATCH",
                body: payload
            }),
        }),

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

        getFolowings: builder.query<{ data: { data: IFolow[], meta: IMeta } }, { userName: string, query: {} }>({
            query: ({ userName, query }) => ({
                url: `/users/folowings/${userName}`,
                method: "GET",
                params: query,
            }),
            providesTags: (result, error, arg) => [{ type: tagTypes.folowings, id: arg.userName }],
        }),
        getFolowers: builder.query<{ data: { data: IFolow[], meta: IMeta } }, { userName: string, query: {} }>({
            query: ({ userName, query }) => ({
                url: `/users/folowers/${userName}`,
                method: "GET",
                params: query,
            }),
            providesTags: (result, error, arg) => [{ type: tagTypes.folowers, id: arg.userName }],
        }),

    }),
})

export const { useGetCharitiesQuery, useDefaultBillingDetailsQuery, useUpdateBillingDetailsMutation, useSellerBundleTiersQuery, useUserAddressesQuery, useGetUserByUsernameQuery, useLazyGetFolowingsQuery, useLazyGetFolowersQuery, useBalanceQuery, useAccountDataQuery, useConnectAccountMutation } = userApi;