"use server"
import { revalidatePath } from "next/cache";
import { serverQueryWithReauth } from "./ReAuthRequest";

export const FolowMemeber = async ({ payload }: { payload: { "memberId": string } }) => {

    const res = await serverQueryWithReauth({ payload, endPoint: "/folow", method: "POST" });

    revalidatePath(`/member/${payload?.memberId}`);

    return res;
}

export const UnFolowMemeber = async ({ payload }: { payload: { "memberId": string } }) => {

    const res = await serverQueryWithReauth({ payload, endPoint: "/folow/unfolow", method: "POST" });

    revalidatePath(`/member/${payload?.memberId}`);

    return res;
}