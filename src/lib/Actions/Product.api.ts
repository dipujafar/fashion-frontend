"use server"
import { serverQueryWithReauth } from "./ReAuthRequest";

export const AddNewProduct = async ({ payload }: { payload: FormData }) => {

    const res = await serverQueryWithReauth({ payload, endPoint: `/products`, method: "POST" });

    return res;
}