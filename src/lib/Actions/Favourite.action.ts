"use server"
import { revalidatePath } from "next/cache";
import { serverQueryWithReauth } from "./ReAuthRequest";

export const AddToFavourite = async ({ payload, extraRevalidatePaths = [] }: { payload: { "productId": string }, extraRevalidatePaths?: string[] }) => {

    const res = await serverQueryWithReauth({ payload, endPoint: "/favourites", method: "POST" });

    revalidatePath(`/shop/${payload?.productId}`);

    if (extraRevalidatePaths.length > 0) {
        for (let path of extraRevalidatePaths) {
            revalidatePath(path);
        }
    }

    return res;
}

export const DeleteToFavourite = async ({ payload, extraRevalidatePaths = [] }: { payload: { "productId": string }, extraRevalidatePaths?: string[] }) => {

    const res = await serverQueryWithReauth({ endPoint: `/favourites/${payload?.productId}`, method: "DELETE" });

    revalidatePath(`/shop/${payload?.productId}`);

    if (extraRevalidatePaths.length > 0) {
        for (let path of extraRevalidatePaths) {
            revalidatePath(path);
        }
    }

    return res;
}