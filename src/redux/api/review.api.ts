import { IMeta, IReview } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";

const reviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        reviewsGetBySeller: builder.query<{ message: string, data: { data: IReview[], meta: IMeta } }, { userName: string, query: {} }>({
            query: ({ query, userName }) => ({
                url: `/reviews/member/${userName}`,
                method: 'GET',
                query: query,
            }),
            providesTags: (result, error, arg) => [{ type: tagTypes.review, id: arg.userName }],
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

export const { useLazyReviewsGetBySellerQuery, useReviewStatBySellerQuery } = reviewApi;