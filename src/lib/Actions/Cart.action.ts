"use server"
import { revalidatePath, revalidateTag } from "next/cache";
import { serverQueryWithReauth } from "./ReAuthRequest";
import { tags } from "@/utils/serverTags";
import { IBillingDetails } from "@/types";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export const AddToCart = async ({ payload, extraRevalidatePaths = [] }: { payload: { productId: string, quantity: number, extraDonation: number, extraDonationAnonymous: boolean, charities: { charityId: string }[] }, extraRevalidatePaths?: string[] }) => {
    try {
        const res = await serverQueryWithReauth({ payload, endPoint: "/carts", method: "POST" });

        if (extraRevalidatePaths.length > 0) {
            for (let path of extraRevalidatePaths) {
                revalidatePath(path);
            }
        }

        return {
            success: res?.success !== undefined ? Boolean(res.success) : true,
            message: res?.message || "Item added to cart successfully",
            data: res?.data !== undefined ? res.data : (res ?? null),
        };
    } catch (error: any) {
        if (isRedirectError(error)) {
            throw error;
        }
        return {
            success: false,
            message: error?.message || "Failed to add item to cart",
            data: null,
        };
    }
}

export const DeleteFromCart = async ({ payload, extraRevalidatePaths = [] }: { payload: { productId: string }, extraRevalidatePaths?: string[] }) => {
    try {
        const res = await serverQueryWithReauth({ endPoint: `/carts/${payload?.productId}`, method: "DELETE" });

        if (extraRevalidatePaths.length > 0) {
            for (let path of extraRevalidatePaths) {
                revalidatePath(path);
            }
        }

        return {
            success: res?.success !== undefined ? Boolean(res.success) : true,
            message: res?.message || "Item removed from cart successfully",
            data: res?.data !== undefined ? res.data : (res ?? null),
        };
    } catch (error: any) {
        if (isRedirectError(error)) {
            throw error;
        }
        return {
            success: false,
            message: error?.message || "Failed to remove item from cart",
            data: null,
        };
    }
}

export const updateShippingDetails = async (payload: IBillingDetails, cartGroupId?: string) => {
    try {
        const res = await serverQueryWithReauth({
            endPoint: `/users/buying-details`,
            method: "PUT",
            payload,
            cache: "no-store",
        });
        revalidateTag(tags.cart_summary);
        revalidateTag(tags.shipping_rates);
        revalidatePath(`/profile/address`);
        if (cartGroupId) {
            revalidatePath(`/checkout/cart/${cartGroupId}`);
        }
        return {
            success: res?.success !== undefined ? Boolean(res.success) : true,
            message: res?.message || "Shipping details updated successfully",
            data: res?.data !== undefined ? res.data : (res ?? null),
        };
    } catch (error: any) {
        if (isRedirectError(error)) {
            throw error;
        }
        return {
            success: false,
            message: error?.message || "Failed to update shipping details",
            data: null,
        };
    }
}

export const updateSellingDetails = async (payload: IBillingDetails, tags?: string[]) => {
    try {
        const res = await serverQueryWithReauth({
            endPoint: `/users/selling-address`,
            method: "PUT",
            payload,
            cache: "no-store",
            tags
        });
        revalidatePath(`/profile/address`);
        return {
            success: res?.success !== undefined ? Boolean(res.success) : true,
            message: res?.message || "Selling details updated successfully",
            data: res?.data !== undefined ? res.data : (res ?? null),
        };
    } catch (error: any) {
        if (isRedirectError(error)) {
            throw error;
        }
        return {
            success: false,
            message: error?.message || "Failed to update selling details",
            data: null,
        };
    }
}