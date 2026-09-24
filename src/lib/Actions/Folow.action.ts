"use server"
import { revalidatePath } from "next/cache";
import { serverQueryWithReauth } from "./ReAuthRequest";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export const FolowMemeber = async ({ payload }: { payload: { "memberId": string } }) => {
    try {
        const res = await serverQueryWithReauth({ payload, endPoint: "/folow", method: "POST" });

        revalidatePath(`/member/${payload?.memberId}`);

        return {
            success: res?.success !== undefined ? Boolean(res.success) : true,
            message: res?.message || "Followed member successfully",
            data: res?.data !== undefined ? res.data : (res ?? null),
        };
    } catch (error: any) {
        if (isRedirectError(error)) {
            throw error;
        }
        return {
            success: false,
            message: error?.message || "Failed to follow member",
            data: null,
        };
    }
}

export const UnFolowMemeber = async ({ payload }: { payload: { "memberId": string } }) => {
    try {
        const res = await serverQueryWithReauth({ payload, endPoint: "/folow/unfolow", method: "POST" });

        revalidatePath(`/member/${payload?.memberId}`);

        return {
            success: res?.success !== undefined ? Boolean(res.success) : true,
            message: res?.message || "Unfollowed member successfully",
            data: res?.data !== undefined ? res.data : (res ?? null),
        };
    } catch (error: any) {
        if (isRedirectError(error)) {
            throw error;
        }
        return {
            success: false,
            message: error?.message || "Failed to unfollow member",
            data: null,
        };
    }
}