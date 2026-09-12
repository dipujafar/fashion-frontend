import { IDirectDonation, IMeta, IOrder, ISelldonation } from "@/types";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const earningApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSellsEarnings: builder.query<{ data: { data: IOrder[], meta: IMeta } }, {}>({
            query: (query) => ({
                url: "/payments/sell-earnings",
                method: "GET",
                params: query
            }),
        }),
        getSellsDonationRaised: builder.query<{ data: { data: ISelldonation[], meta: IMeta } }, {}>({
            query: (query) => ({
                url: "/payments/sell-donation-raised",
                method: "GET",
                params: query
            }),
        }),
        getDirectDonationRaised: builder.query<{ data: { data: IDirectDonation[], meta: IMeta } }, {}>({
            query: (query) => ({
                url: "/payments/directDonationRaised",
                method: "GET",
                params: query
            }),
        }),

    }),
});

export const { useGetSellsEarningsQuery, useGetSellsDonationRaisedQuery, useGetDirectDonationRaisedQuery } = earningApi;
