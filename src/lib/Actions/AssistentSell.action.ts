"use server"
import { serverQueryWithReauth } from "./ReAuthRequest";

export const RequestNewAssitentSell = async ({ payload }: { payload: FormData }) => {

    const res = await serverQueryWithReauth({ payload, endPoint: `/assistent-sell`, method: "POST" });

    return res;
}
