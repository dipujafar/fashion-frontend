"use server"
import { revalidatePath, revalidateTag } from "next/cache";
import { serverQueryWithReauth } from "./ReAuthRequest";

export const CancelOrder = async ({ payload }: { payload: { "sellerGroupId": string } }) => {

    const res = await serverQueryWithReauth({ payload, endPoint: `/orders/cancel/${payload?.sellerGroupId}`, method: "PATCH" });

    revalidatePath(`/profile/sell`);

    return res;
}

export const ConfirmOrder = async ({ payload }: { payload: { "sellerGroupId": string } }) => {

    const res = await serverQueryWithReauth({ payload, endPoint: `/orders/confirm/${payload?.sellerGroupId}`, method: "PATCH" });

    revalidatePath(`/profile/sell`);

    return res;
}