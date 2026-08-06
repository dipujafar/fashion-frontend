"use server"
import { revalidatePath, revalidateTag } from "next/cache";
import { serverQueryWithReauth } from "./ReAuthRequest";
import { tags } from "@/utils/serverTags";

export const AddToCart = async ({ payload, extraRevalidatePaths = [] }: { payload: { productId: string, quantity: number, extraDonation: number, extraDonationAnonymous: boolean, charities: { charityId: string }[] }, extraRevalidatePaths?: string[] }) => {

    const res = await serverQueryWithReauth({ payload, endPoint: "/carts", method: "POST" });

    revalidatePath(`/shop/${payload?.productId}`);
    revalidatePath(`/shopping-cart`);
    revalidateTag(tags.carts);

    if (extraRevalidatePaths.length > 0) {
        for (let path of extraRevalidatePaths) {
            revalidatePath(path);
        }
    }

    return res;
}

export const DeleteFromCart = async ({ payload, extraRevalidatePaths = [] }: { payload: { "itemId": string, productId: string }, extraRevalidatePaths?: string[] }) => {

    const res = await serverQueryWithReauth({ endPoint: `/carts/${payload?.itemId}`, method: "DELETE" });

    revalidatePath(`/shop/${payload?.productId}`);
    revalidatePath(`/shopping-cart`);
    revalidateTag(tags.carts);

    if (extraRevalidatePaths.length > 0) {
        for (let path of extraRevalidatePaths) {
            revalidatePath(path);
        }
    }

    return res;
}