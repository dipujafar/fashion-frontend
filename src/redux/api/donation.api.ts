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
                    charityBio : string | null,
                    "charityName": string,
                    lname: string,
                    fname: string,
                    userName : string,
                    "charityImage": string,
                    "totalDonation": number,
                    productsSupported : number
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