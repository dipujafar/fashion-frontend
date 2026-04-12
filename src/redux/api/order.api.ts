import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        addNewOrder: builder.mutation<{ message: string, data : string }, any>({
            query: (payload) => ({
                url: "/orders",
                method: "POST",
                body: payload
            }),
            invalidatesTags: [tagTypes.orders],
        })
    }),
})

export const { useAddNewOrderMutation } = orderApi;