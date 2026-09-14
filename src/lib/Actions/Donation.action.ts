"use server"
import { serverQueryWithReauth } from "./ReAuthRequest";

export const DonateDirectMoney = async ({ payload }: { payload: { "charityId": string, amount: string, isAnonymous: boolean } }) => {

    const res = await serverQueryWithReauth({ payload, endPoint: "/payments/donation/checkout", method: "POST" });

    return res;
}