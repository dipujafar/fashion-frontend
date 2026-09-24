"use server"
import { serverQueryWithReauth } from "./ReAuthRequest";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export const DonateDirectMoney = async ({ payload }: { payload: { "charityId": string, amount: string, isAnonymous: boolean } }) => {
    try {
        const res = await serverQueryWithReauth({ payload, endPoint: "/payments/donation/checkout", method: "POST" });
        return {
            success: res?.success !== undefined ? Boolean(res.success) : true,
            message: res?.message || "Donation checkout initiated successfully",
            data: res?.data !== undefined ? res.data : (res ?? null),
        };
    } catch (error: any) {
        if (isRedirectError(error)) {
            throw error;
        }
        return {
            success: false,
            message: error?.message || "Failed to process donation",
            data: null,
        };
    }
}