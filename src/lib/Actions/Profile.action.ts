"use server"
import { revalidatePath } from "next/cache";
import { serverQueryWithReauth } from "./ReAuthRequest";

export const UpdateProfile = async ({ payload }: { payload: FormData }) => {

    const res = await serverQueryWithReauth({ payload, endPoint: "/users/update-my-profile", method: "PATCH" });

    revalidatePath(`/profile`);

    return res;
}

export const UpdateBundleDiscounts = async ({ payload }: { payload: { enabled: boolean; tiers: { quantity: string; percent: string }[] } }) => {

    const res = await serverQueryWithReauth({ payload, endPoint: "/users/bundle-discount", method: "PUT" });

    revalidatePath(`/profile/sell/bundle-discount`);

    return res;
}