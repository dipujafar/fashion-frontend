"use server"
import { revalidatePath } from "next/cache";
import { serverQueryWithReauth } from "./ReAuthRequest";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export const RequestNewAssitentSell = async ({ payload }: { payload: FormData }) => {
    try {
        const res = await serverQueryWithReauth({ payload, endPoint: `/assistent-sell`, method: "POST" });
        return {
            success: res?.success !== undefined ? Boolean(res.success) : true,
            message: res?.message || "Assisted sell request submitted successfully",
            data: res?.data !== undefined ? res.data : (res ?? null),
        };
    } catch (error: any) {
        if (isRedirectError(error)) {
            throw error;
        }
        return {
            success: false,
            message: error?.message || "Failed to submit assisted sell request",
            data: null,
        };
    }
}

export const DltAssitentSellReq = async ({ id }: { id: string }) => {
    try {
        const res = await serverQueryWithReauth({ endPoint: `/assistent-sell/${id}`, method: "DELETE" });
        revalidatePath("/profile/assisted-sell");
        return {
            success: res?.success !== undefined ? Boolean(res.success) : true,
            message: res?.message || "Assisted sell request deleted successfully",
            data: res?.data !== undefined ? res.data : (res ?? null),
        };
    } catch (error: any) {
        if (isRedirectError(error)) {
            throw error;
        }
        return {
            success: false,
            message: error?.message || "Failed to delete assisted sell request",
            data: null,
        };
    }
}