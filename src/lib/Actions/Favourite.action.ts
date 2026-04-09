"use server"
import { revalidatePath } from "next/cache";
import { serverQueryWithReauth } from "./ReAuthRequest";

export const AddToFavourite = async ({ payload }: { payload: { "productId": string } }) => {

    const res = await serverQueryWithReauth({ payload, endPoint: "/favourites", method: "POST" });

    revalidatePath(`/shop/${payload?.productId}`);

    return res;
}

export const DeleteToFavourite = async ({ payload }: { payload: { "productId": string } }) => {

    const res = await serverQueryWithReauth({ endPoint: `/favourites/${payload?.productId}`, method: "DELETE" });

    revalidatePath(`/shop/${payload?.productId}`);

    return res;
}