"use server"
import { revalidatePath, revalidateTag } from "next/cache";
import { serverQueryWithReauth } from "./ReAuthRequest";
import { tags } from "@/utils/serverTags";
import { IBillingDetails } from "@/types";

export const AddToCart = async ({ payload, extraRevalidatePaths = [] }: { payload: { productId: string, quantity: number, extraDonation: number, extraDonationAnonymous: boolean, charities: { charityId: string }[] }, extraRevalidatePaths?: string[] }) => {

    const res = await serverQueryWithReauth({ payload, endPoint: "/carts", method: "POST" });

    if (extraRevalidatePaths.length > 0) {
        for (let path of extraRevalidatePaths) {
            revalidatePath(path);
        }
    }

    return res;
}

export const DeleteFromCart = async ({ payload, extraRevalidatePaths = [] }: { payload: { productId: string }, extraRevalidatePaths?: string[] }) => {

    const res = await serverQueryWithReauth({ endPoint: `/carts/${payload?.productId}`, method: "DELETE" });

    if (extraRevalidatePaths.length > 0) {
        for (let path of extraRevalidatePaths) {
            revalidatePath(path);
        }
    }

    return res;
}

export const updateShippingDetails = async (payload: IBillingDetails, cartGroupId?: string) => {

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
        revalidatePath(`/checkout/${cartGroupId}`);
    }
    return res;
}

export const updateSellingDetails = async (payload: IBillingDetails, tags?: string[]) => {

    const res = await serverQueryWithReauth({
        endPoint: `/users/selling-address`,
        method: "PUT",
        payload,
        cache: "no-store",
        tags
    });
    revalidatePath(`/profile/address`);
    return res;
}