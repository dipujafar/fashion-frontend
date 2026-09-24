"use server"
import { revalidatePath } from "next/cache";
import { serverQueryWithReauth } from "./ReAuthRequest";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export const AddToFavourite = async ({ payload, extraRevalidatePaths = [] }: { payload: { "productId": string }, extraRevalidatePaths?: string[] }) => {
    try {
        const res = await serverQueryWithReauth({ payload, endPoint: "/favourites", method: "POST" });

        revalidatePath(`/shop/${payload?.productId}`);

        if (extraRevalidatePaths.length > 0) {
            for (let path of extraRevalidatePaths) {
                revalidatePath(path);
            }
        }

        return {
            success: res?.success !== undefined ? Boolean(res.success) : true,
            message: res?.message || "Product added to favourites",
            data: res?.data !== undefined ? res.data : (res ?? null),
        };
    } catch (error: any) {
        if (isRedirectError(error)) {
            throw error;
        }
        return {
            success: false,
            message: error?.message || "Failed to add to favourites",
            data: null,
        };
    }
}

export const DeleteToFavourite = async ({ payload, extraRevalidatePaths = [] }: { payload: { "productId": string }, extraRevalidatePaths?: string[] }) => {
    try {
        const res = await serverQueryWithReauth({ endPoint: `/favourites/${payload?.productId}`, method: "DELETE" });

        revalidatePath(`/shop/${payload?.productId}`);

        if (extraRevalidatePaths.length > 0) {
            for (let path of extraRevalidatePaths) {
                revalidatePath(path);
            }
        }

        return {
            success: res?.success !== undefined ? Boolean(res.success) : true,
            message: res?.message || "Product removed from favourites",
            data: res?.data !== undefined ? res.data : (res ?? null),
        };
    } catch (error: any) {
        if (isRedirectError(error)) {
            throw error;
        }
        return {
            success: false,
            message: error?.message || "Failed to remove from favourites",
            data: null,
        };
    }
}