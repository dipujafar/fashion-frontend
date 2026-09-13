"use server"
import { revalidatePath, revalidateTag } from "next/cache";
import { serverQueryWithReauth } from "./ReAuthRequest";

export const makeOrder = async ({ payload }: { payload: { "cartGroupId": string, shipmentServiceId: string, treeGiftCount: number, allowedAuthentication: boolean } }) => {

    const res = await serverQueryWithReauth({ payload, endPoint: `/orders`, method: "POST" });

    return res;
}

// export const CancelOrder = async ({ payload }: { payload: { "sellerGroupId": string } }) => {

//     const res = await serverQueryWithReauth({ payload, endPoint: `/orders/cancel/${payload?.sellerGroupId}`, method: "PATCH" });

//     revalidatePath(`/profile/sell`);

//     return res;
// }

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

export const ApproveCancelRequest = async ({ payload }: { payload: { "orderItemId": string } }) => {

    const res = await serverQueryWithReauth({ payload, endPoint: `/orders/items/cancel/approve`, method: "PATCH" });

    revalidatePath(`/profile/sell/orders`);

    return res;
}
export const RequestCancelItem = async ({ payload }: { payload: FormData }) => {

    const res = await serverQueryWithReauth({ payload, endPoint: `/orders/items/cancel/request`, method: "POST" });

    revalidatePath(`/profile/purchase/orders`);

    return res;
}
export const DeclineCancelRequest = async ({ payload }: { payload: { "orderItemId": string } }) => {

    const res = await serverQueryWithReauth({ payload, endPoint: `/orders/items/cancel/decline`, method: "PATCH" });

    revalidatePath(`/profile/sell/orders`);

    return res;
}