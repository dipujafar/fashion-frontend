"use server"
import { revalidatePath } from "next/cache";
import { serverQueryWithReauth } from "./ReAuthRequest";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export const UpdateProfile = async ({ payload }: { payload: FormData }) => {
    try {
        const res = await serverQueryWithReauth({ payload, endPoint: "/users/update-my-profile", method: "PATCH" });
        revalidatePath(`/profile`);
        return {
            success: res?.success !== undefined ? Boolean(res.success) : true,
            message: res?.message || "Profile updated successfully",
            data: res?.data !== undefined ? res.data : (res ?? null),
        };
    } catch (error: any) {
        if (isRedirectError(error)) {
            throw error;
        }
        return {
            success: false,
            message: error?.message || "Failed to update profile",
            data: null,
        };
    }
}

export const ChangePassword = async ({ payload }: { payload: { oldPassword: string; newPassword: string, confirmPassword: string } }) => {
    try {
        const res = await serverQueryWithReauth({ payload, endPoint: "/auth/change-password", method: "PATCH" });
        return {
            success: res?.success !== undefined ? Boolean(res.success) : true,
            message: res?.message || "Password updated successfully",
            data: res?.data !== undefined ? res.data : (res ?? null),
        };
    } catch (error: any) {
        if (isRedirectError(error)) {
            throw error;
        }
        return {
            success: false,
            message: error?.message || "Failed to update password",
            data: null,
        };
    }
}

export const UpdateBundleDiscounts = async ({ payload }: { payload: { enabled: boolean; tiers: { quantity: string; percent: string }[] } }) => {
    try {
        const res = await serverQueryWithReauth({ payload, endPoint: "/users/bundle-discount", method: "PUT" });
        revalidatePath(`/profile/sell/bundle-discount`);
        return {
            success: res?.success !== undefined ? Boolean(res.success) : true,
            message: res?.message || "Bundle discounts updated successfully",
            data: res?.data !== undefined ? res.data : (res ?? null),
        };
    } catch (error: any) {
        if (isRedirectError(error)) {
            throw error;
        }
        return {
            success: false,
            message: error?.message || "Failed to update bundle discounts",
            data: null,
        };
    }
}

export const UpdateVacationMode = async ({ payload }: { payload: { vacationMode: boolean } }) => {
    try {
        const res = await serverQueryWithReauth({ payload, endPoint: "/users/update-my-profile", method: "PATCH" });
        return {
            success: res?.success !== undefined ? Boolean(res.success) : true,
            message: res?.message || "Vacation mode updated successfully",
            data: res?.data !== undefined ? res.data : (res ?? null),
        };
    } catch (error: any) {
        if (isRedirectError(error)) {
            throw error;
        }
        return {
            success: false,
            message: error?.message || "Failed to update vacation mode",
            data: null,
        };
    }
}