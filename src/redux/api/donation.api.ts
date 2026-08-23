import { baseApi } from "./baseApi";

const donationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({


        sellerSellCharitySupportStats: builder.query<{
            message: string, data: {
                sellDonatedAmount: number,
                avgSellDonationPercentage: number,
                totalCharitiesToSupport: number,
                donationsByCharity: {
                    "charityId": string,
                    "charityName": string,
                    "charityImage": string,
                    "totalDonation": number
                }[]
            }
        }, { userName: string }>({
            query: ({ userName }) => ({
                url: `/donations/seller-charity-support/${userName}`,
            }),
        }),

    })

})

export const { useSellerSellCharitySupportStatsQuery } = donationApi;