"use server"
import { revalidatePath } from "next/cache";
import { serverQueryWithReauth } from "./ReAuthRequest";

export const RequestNewAssitentSell = async ({ payload }: { payload: FormData }) => {

    const res = await serverQueryWithReauth({ payload, endPoint: `/assistent-sell`, method: "POST" });

    return res;
}

export const DltAssitentSellReq = async ({ id }: { id: string }) => {

    const res = await serverQueryWithReauth({ endPoint: `/assistent-sell/${id}`, method: "DELETE" });

    revalidatePath("/profile/assisted-sell");

    return res;
}