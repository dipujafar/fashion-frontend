"use client"
import React from 'react'
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { AddAnswerToQuestion } from '@/lib/Actions/Question.action';
import { toast } from 'sonner';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import LoadingSpin from '@/components/ui/loading-spin';


const replyFormSchema = z.object({
    reply: z
        .string({ required_error: "Question is required" })
        .min(1, { message: "Question is required" }),
});

function AddAnsForm({ prodId, questionId }: { prodId: string, questionId: string }) {
    const replyForm = useForm<z.infer<typeof replyFormSchema>>({
        resolver: zodResolver(replyFormSchema),
        defaultValues: {
            reply: "",
        },
    });

    const onSubmitReply = async (data: z.infer<typeof replyFormSchema>) => {
        try {
            const res = await AddAnswerToQuestion({ payload: { questionId: questionId, answer: data?.reply }, prodId });
            if (res?.error) {
                toast.error(res?.error);
            }

            console.log(res);
            toast.success("Reply added successfully");
        }
        catch (error: any) {
            if (isRedirectError(error)) {
                throw error; // Let Next.js handle the redirect
            }
            toast.error(error?.data?.message);
        }
    };

    return (
        <Form {...replyForm}>
            <form onSubmit={replyForm.handleSubmit(onSubmitReply)}>
                <FormField
                    control={replyForm.control}
                    name="reply"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder="Enter your reply"
                                    {...field}
                                    className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded  bg-slate-50 mt-2 "
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end">
                    <Button
                        size={"sm"}
                        className="mt-4 group cursor-pointer"
                    >
                        Reply {replyForm?.formState?.isLoading && <LoadingSpin color="white" />}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default AddAnsForm