"use server"
import { serverQueryWithReauth } from "./ReAuthRequest";

export const AddNewProduct = async ({ payload }: { payload: FormData }) => {

    const res = await serverQueryWithReauth({ payload, endPoint: `/products`, method: "POST" });

    return res;
}

export const AddNewOffer = async ({ payload }: { payload: { sellerId: string, offerPrice: number, productIds: string[] } }) => {

    const res = await serverQueryWithReauth({ payload, endPoint: `/products/offer`, method: "POST" });

    return res;
}

export const AcceptOffer = async ({ payload }: { payload: { offerId: string } }) => {

    const res = await serverQueryWithReauth({ payload, endPoint: `/products/offer/accept`, method: "POST" });

    return res;
}

export const DeclineOffer = async ({ payload }: { payload: { offerId: string, offerPrice: number } }) => {

    const res = await serverQueryWithReauth({ payload, endPoint: `/products/offer/decline`, method: "POST" });

    return res;
}