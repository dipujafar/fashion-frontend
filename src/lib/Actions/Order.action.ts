"use server"
import { revalidatePath, revalidateTag } from "next/cache";
import { serverQueryWithReauth } from "./ReAuthRequest";

export const makeOrder = async ({ payload }: { payload: { "cartGroupId": string, shipmentServiceId: string } }) => {

    const res = await serverQueryWithReauth({ payload, endPoint: `/orders`, method: "POST" });

    return res;
}

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

export const MarkShipped = async ({ payload }: { payload: { "sellerGroupId": string } }) => {

    const res = await serverQueryWithReauth({ payload, endPoint: `/orders/mark-shipped/${payload?.sellerGroupId}`, method: "PATCH" });

    revalidatePath(`/profile/sell`);

    return res;
}

export const GetLebel = async ({ payload }: { payload: { "orderId": string } }) => {

    const res = await serverQueryWithReauth({ payload, endPoint: `/orders/shipping-label/${payload?.orderId}`, method: "POST" });

    revalidatePath(`/profile/sell/orders`);

    return res;
}

export const CancelOrderItems = async ({ payload }: { payload: FormData }) => {

    const res = await serverQueryWithReauth({ payload, endPoint: `/orders/items/cancel`, method: "POST" });

    revalidatePath(`/profile/sell/orders`);

    return res;
}