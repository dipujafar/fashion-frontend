"use server"
import { revalidatePath } from "next/cache";
import { serverQueryWithReauth } from "./ReAuthRequest";

export const AddQuestion = async ({ payload }: { payload: { "productId": string, question: string } }) => {

    const res = await serverQueryWithReauth({ payload, endPoint: "/questions", method: "POST" });

    revalidatePath(`/shop/${payload?.productId}`);

    return res;
}

export const AddAnswerToQuestion = async ({ payload, prodId }: { payload: { "questionId": string, answer: string }, prodId: string }) => {

    const res = await serverQueryWithReauth({ payload, endPoint: "/questions/answer", method: "POST" });

    revalidatePath(`/shop/${prodId}`);

    return res;
}