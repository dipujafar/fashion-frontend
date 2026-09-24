import { IMessage, IMeta } from "@/types";
import { baseApi } from "./baseApi";

const messageApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        totalUnreadMsgCount: builder.query<{
            data: number
        }, void>({
            query: () => ({
                url: `/messages/unread-count`,
                method: "GET",
            }),
        }),

        getMyMessages: builder.query<{
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
        }, FormData>({
            query: (body) => ({
                url: `/messages/send`,
                method: "POST",
                body: body
            }),
        }),

    }),
});

export const { useLazyGetMyMessagesQuery, useSendNewMsgMutation, useTotalUnreadMsgCountQuery } = messageApi;
