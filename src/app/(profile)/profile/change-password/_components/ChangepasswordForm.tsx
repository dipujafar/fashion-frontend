"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { ChangePassword } from '@/lib/Actions/Profile.action';

const schema = z.object({
    oldPassword: z
        .string({ required_error: "Old password is required" })
        .min(1, { message: "Old password is required" }),

    newPassword: z
        .string({ required_error: "New password is required" })
        .min(1, { message: "New password is required" })
        .min(6, { message: "New passwords must be at least 8 characters long" })
        .max(64, { message: "New passwords must be at most 64 characters long" })
        .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Must contain at least one number" })
        .regex(/[^A-Za-z0-9]/, { message: "Must contain at least one special character" }),

    confirmPassword: z
        .string({ required_error: "Confirm Password is required" })
        .min(1, { message: "Confirm password is required" })
        .min(6, { message: "Confirm passwords must be at least 8 characters long" })
        .max(64, { message: "Confirm passwords must be at most 64 characters long" })
        .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Must contain at least one number" })
        .regex(/[^A-Za-z0-9]/, { message: "Must contain at least one special character" }),
});

function ChangepasswordForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

    const { formState: { isSubmitting: isLoading } } = form;

    const onSubmit = async (data: z.infer<typeof schema>) => {

        try {

            await ChangePassword({ payload: data });

            toast.success("Password Updated Successfully");

            form.reset();

        } catch (error: any) {
            if (isRedirectError(error)) {
                throw error; // Let Next.js handle the redirect
            }
            toast.error(error?.message || "Failed to update password");
        }

    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="md:space-y-6 space-y-4 max-w-4xl mt-10">

                <div className='space-y-7 max-w-lg'>

                    <div className="flex-1">
                        <FormField
                            control={form.control}
                            name="oldPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Old Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Enter Your Old Password"
                                                {...field}
                                                className="border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 border focus-visible:border-primary-black !py-5 px-4 disabled:text-black"
                                            />
                                            <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                                {showPassword ? (
                                                    <div
                                                        onClick={() => setShowPassword(false)}
                                                        className="cursor-pointer"
                                                    >
                                                        <Eye color="#A5A7A9" className='size-5' />
                                                    </div>
                                                ) : (
                                                    <div
                                                        onClick={() => setShowPassword(true)}
                                                        className="cursor-pointer"
                                                    >
                                                        <EyeOff color="#A5A7A9" className='size-5' />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex-1">
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showNewPassword ? "text" : "password"}
                                                placeholder="Enter Your New Password"
                                                {...field}
                                                className="border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 border focus-visible:border-primary-black !py-5 px-4 disabled:text-black"
                                            />
                                            <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                                {showNewPassword ? (
                                                    <div
                                                        onClick={() => setShowNewPassword(false)}
                                                        className="cursor-pointer"
                                                    >
                                                        <Eye color="#A5A7A9" className='size-5' />
                                                    </div>
                                                ) : (
                                                    <div
                                                        onClick={() => setShowNewPassword(true)}
                                                        className="cursor-pointer"
                                                    >
                                                        <EyeOff color="#A5A7A9" className='size-5' />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex-1">
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="Enter Your Confirm Password"
                                                {...field}
                                                className="border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 border focus-visible:border-primary-black !py-5 px-4 disabled:text-black"
                                            />
                                            <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                                {showConfirmPassword ? (
                                                    <div
                                                        onClick={() => setShowConfirmPassword(false)}
                                                        className="cursor-pointer"
                                                    >
                                                        <Eye color="#A5A7A9" className='size-5' />
                                                    </div>
                                                ) : (
                                                    <div
                                                        onClick={() => setShowConfirmPassword(true)}
                                                        className="cursor-pointer"
                                                    >
                                                        <EyeOff color="#A5A7A9" className='size-5' />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                </div>

                <Button size={"lg"} type='submit' className="cursor-pointer gap-2 disabled:cursor-not-allowed rounded-none mt-3" disabled={isLoading}>
                    {isLoading ? <span className="loader" /> : "Save Changes "}
                </Button>

            </form>
        </Form>
    )
}

export default ChangepasswordForm