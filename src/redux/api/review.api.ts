import { IMeta, IReview } from "@/types";
import { baseApi } from "./baseApi";

const reviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        reviewsGetBySeller: builder.mutation<{ message: string, data: { data: IReview[], meta: IMeta } }, { userName: string, query: {} }>({
            query: ({ query, userName }) => ({
                url: `/reviews/member/${userName}`,
                method: 'GET',
                query: query,
            }),
        }),
        reviewStatBySeller: builder.query<{
            message: string, data: {
                totalReviews: number,
                averageRating: number,
            }
        }, { userName: string }>({
            query: ({ userName }) => ({
                url: `/reviews/stats/${userName}`,
            }),
        }),

    })

})

export const { useReviewsGetBySellerMutation, useReviewStatBySellerQuery } = reviewApi;