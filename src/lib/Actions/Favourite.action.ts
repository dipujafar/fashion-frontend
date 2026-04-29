"use server"
import { revalidatePath, revalidateTag } from "next/cache";
import { serverQueryWithReauth } from "./ReAuthRequest";
import { tags } from "@/utils/serverTags";

export const AddToFavourite = async ({ payload }: { payload: { "productId": string } }) => {

    const res = await serverQueryWithReauth({ payload, endPoint: "/favourites", method: "POST" });

    revalidatePath(`/shop/${payload?.productId}`);
    revalidateTag(tags.products);
    revalidateTag(tags.favourites);

    return res;
}

export const DeleteToFavourite = async ({ payload }: { payload: { "productId": string } }) => {

    const res = await serverQueryWithReauth({ endPoint: `/favourites/${payload?.productId}`, method: "DELETE" });

    revalidatePath(`/shop/${payload?.productId}`);
    revalidateTag(tags.products);
    revalidateTag(tags.favourites);

    return res;
}