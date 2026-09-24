"use server"
import { revalidatePath } from "next/cache";
import { serverQueryWithReauth } from "./ReAuthRequest";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export const AddQuestion = async ({ payload }: { payload: { "productId": string, question: string } }) => {
    try {
        const res = await serverQueryWithReauth({ payload, endPoint: "/questions", method: "POST" });
        revalidatePath(`/shop/${payload?.productId}`);
        return {
            success: res?.success !== undefined ? Boolean(res.success) : true,
            message: res?.message || "Question added successfully",
            data: res?.data !== undefined ? res.data : (res ?? null),
        };
    } catch (error: any) {
        if (isRedirectError(error)) {
            throw error;
        }
        return {
            success: false,
            message: error?.message || "Failed to add question",
            data: null,
        };
    }
}

export const AddAnswerToQuestion = async ({ payload, prodId }: { payload: { "questionId": string, answer: string }, prodId: string }) => {
    try {
        const res = await serverQueryWithReauth({ payload, endPoint: "/questions/answer", method: "POST" });
        revalidatePath(`/shop/${prodId}`);
        return {
            success: res?.success !== undefined ? Boolean(res.success) : true,
            message: res?.message || "Answer added successfully",
            data: res?.data !== undefined ? res.data : (res ?? null),
        };
    } catch (error: any) {
        if (isRedirectError(error)) {
            throw error;
        }
        return {
            success: false,
            message: error?.message || "Failed to add answer",
            data: null,
        };
    }
}