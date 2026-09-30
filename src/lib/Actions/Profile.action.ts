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

export const SendPhoneVerificationOtp = async ({ payload }: { payload: { phone: string } }) => {
    try {
        const res = await serverQueryWithReauth({
            payload,
            endPoint: "/users/send-phone-otp",
            method: "POST"
        });
        return {
            success: res?.success !== undefined ? Boolean(res.success) : true,
            message: res?.message || "Verification code sent to your phone",
            data: res?.data !== undefined ? res.data : (res ?? null),
        };
    } catch (error: any) {
        if (isRedirectError(error)) {
            throw error;
        }
        // Fallback endpoint if route is under /auth
        try {
            const fallbackRes = await serverQueryWithReauth({
                payload,
                endPoint: "/auth/send-phone-otp",
                method: "POST"
            });
            return {
                success: fallbackRes?.success !== undefined ? Boolean(fallbackRes.success) : true,
                message: fallbackRes?.message || "Verification code sent to your phone",
                data: fallbackRes?.data !== undefined ? fallbackRes.data : (fallbackRes ?? null),
            };
        } catch {
            return {
                success: false,
                message: error?.message || "Failed to send verification code",
                data: null,
            };
        }
    }
}

export const VerifyPhoneOtpAction = async ({ payload }: { payload: { phone: string; otp: string } }) => {
    try {
        const res = await serverQueryWithReauth({
            payload,
            endPoint: "/users/verify-phone-otp",
            method: "POST"
        });
        revalidatePath(`/profile`);
        return {
            success: res?.success !== undefined ? Boolean(res.success) : true,
            message: res?.message || "Phone number verified successfully",
            data: res?.data !== undefined ? res.data : (res ?? null),
        };
    } catch (error: any) {
        if (isRedirectError(error)) {
            throw error;
        }
        // Fallback endpoint if route is under /auth
        try {
            const fallbackRes = await serverQueryWithReauth({
                payload,
                endPoint: "/auth/verify-phone-otp",
                method: "POST"
            });
            revalidatePath(`/profile`);
            return {
                success: fallbackRes?.success !== undefined ? Boolean(fallbackRes.success) : true,
                message: fallbackRes?.message || "Phone number verified successfully",
                data: fallbackRes?.data !== undefined ? fallbackRes.data : (fallbackRes ?? null),
            };
        } catch {
            return {
                success: false,
                message: error?.message || "Invalid or expired verification code",
                data: null,
            };
        }
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