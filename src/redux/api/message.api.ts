import { IMessage, IMeta } from "@/types";
import { baseApi } from "./baseApi";

const messageApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getMyMessages: builder.mutation<{
            data: {
                data: IMessage[],
                meta: IMeta
            }
        }, { friendUserName: string, params: {} }>({
            query: ({ params, friendUserName }) => ({
                url: `/messages/pre-messages/${friendUserName}`,
                method: "GET",
                params,
            }),
        }),

        sendNewMsg: builder.mutation<{
            data: {}
        }, { text: string, receiverUserName: string }>({
            query: (body) => ({
                url: `/messages/send`,
                method: "POST",
                body: body
            }),
        }),

    }),
});

export const { useGetMyMessagesMutation, useSendNewMsgMutation } = messageApi;
