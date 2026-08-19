import { IMeta, INotification } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";

const NotificationApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({

        notifications: builder.query<{ data: { data: INotification[], meta: IMeta } }, {}>({
            query: (query) => ({
                url: '/notifications',
                params: query
            }),
            providesTags: [tagTypes?.notification]
        }),
        notificationUnreadCount: builder.query<{ data: number }, void>({
            query: () => ({
                url: '/notifications/unread-count',
            }),
            providesTags: [tagTypes?.notification]
        }),
        readNotification: builder.mutation<{ data: { data: INotification[] } }, { id: string }>({
            query: ({ id }) => ({
                url: `/notifications/make-read/${id}`,
                method: "PUT"
            }),
            invalidatesTags: [tagTypes?.notification]
        }),
        readAllNotifications: builder.mutation<{ data: { data: INotification[] } }, void>({
            query: () => ({
                url: `/notifications/make-read-all`,
                method: "PUT"
            }),
            invalidatesTags: [tagTypes?.notification]
        }),
        deleteNotification: builder.mutation<{ data: { data: INotification[] } }, { id: string }>({
            query: ({ id }) => ({
                url: `/notifications/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: [tagTypes?.notification]
        }),



    }),
});

export const { useNotificationsQuery, useReadNotificationMutation, useReadAllNotificationsMutation, useDeleteNotificationMutation, useNotificationUnreadCountQuery } = NotificationApi;