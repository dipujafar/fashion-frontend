import { IUser } from "@/types";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: "/auth/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    socialSignup: builder.mutation({
      query: (data) => ({
        url: "/auth/social-signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    resendOtp: builder.mutation<
      { success: boolean; message?: string; data?: { token?: string; otpToken?: string } },
      { email: string }
    >({
      query: (data) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: data,
      }),
    }),
    verifyPhoneOtp: builder.mutation<{ success: boolean; message?: string; data?: any }, { token: string; otp: string }>({
      query: (data) => ({
        url: "/auth/verify-phone-otp",
        method: "POST",
        headers: {
          token: `${data.token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    resendPhoneOtp: builder.mutation<{ success: boolean; message?: string; data : {token: string} }, { phone: string }>({
      query: (data) => ({
        url: "/auth/resend-phone-otp",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation<{ data: { user: IUser, accessToken: string, refreshToken: string } }, {}>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    socialLogin: builder.mutation({
      query: (data) => ({
        url: "/auth/login/social",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    checkUsername: builder.mutation<
      { success: boolean; message?: string; data?: any },
      { userName: string }
    >({
      query: (data) => ({
        url: "/auth/check-username",
        method: "POST",
        body: data,
      }),
    }),
    finishAuth: builder.mutation<
      { success: boolean; message?: string; data?: any },
      { formData: FormData; token?: string }
    >({
      query: ({ formData, token }) => ({
        url: "/auth/finish",
        method: "POST",
        headers: token ? { token } : undefined,
        body: formData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useSocialSignupMutation,
  useSocialLoginMutation,
  useCheckUsernameMutation,
  useVerifyPhoneOtpMutation,
  useResendPhoneOtpMutation,
  useFinishAuthMutation,
} = authApi;
