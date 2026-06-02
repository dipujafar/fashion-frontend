"use server"
import { revalidatePath } from "next/cache";
import { serverQueryWithReauth } from "./ReAuthRequest";

export const UpdateProfile = async ({ payload }: { payload: FormData }) => {

    const res = await serverQueryWithReauth({ payload, endPoint: "/users/update-my-profile", method: "PATCH" });

    revalidatePath(`/profile`);

    return res;
}