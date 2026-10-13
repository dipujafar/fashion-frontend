"use client";

import React, { useState } from "react";
import { ShieldCheck, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { VerifyPhoneOtpAction, UpdateProfile } from "@/lib/Actions/Profile.action";
import { useVerifyPhoneOtpMutation } from "@/redux/api/authApi";
import { isRedirectError } from "next/dist/client/components/redirect-error";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@/components/ui/Alert";
import { getErrorMessage } from "@/lib/getErrorMessage";

interface OtpStepProps {
  phone: string;
  countdown: number;
  onResend: () => void;
  onBack: () => void;
  onCancel: () => void;
  onVerified: () => Promise<void>;

  token: string;
}

const formSchema = z.object({
  otp: z
    .string()
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

export function OtpStep({ phone, countdown, onResend, onBack, onVerified, token }: OtpStepProps) {
  const [verifyOtp, { isLoading, isError, error }] = useVerifyPhoneOtpMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {

    const { otp } = data;

    try {
      const res = await verifyOtp({ otp, token }).unwrap();
      await onVerified();
    } catch (error: any) {
      if (isRedirectError(error)) {
        throw error; // Let Next.js handle the redirect
      }
    }
  };

  return (
    <div className="space-y-5">
      <DialogHeader className="text-left space-y-2">
        <div className="flex items-center justify-between">
          <div className="size-11 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-900">
            <ShieldCheck className="size-5" />
          </div>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900 font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft className="size-3.5" />
            Change number
          </button>
        </div>
        <DialogTitle className="text-xl font-bold text-neutral-900 tracking-tight">
          Verify Your Number
        </DialogTitle>
        <DialogDescription className="text-sm text-neutral-500">
          Enter the 6-digit code sent to{" "}
          <span className="font-semibold text-neutral-900">{phone}</span>
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="md:space-y-6 space-y-4"
        >
          {/* OTP Input Field */}
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    value={field.value}
                    onChange={field.onChange}
                    className=""
                  >
                    <InputOTPGroup className="gap-x-2 mx-auto">
                      {Array(6)
                        .fill(null)
                        .map((_, index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className="border size-10 sm:size-12 lg:size-16 text-xl "
                          />
                        ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isError && <Alert type="error" message={getErrorMessage(error, "Failed to verify OTP")} show={isError} />}

          <div className="flex items-center justify-between">


            <div className="text-center text-xs text-neutral-500">
              {countdown > 0 ? (
                <p>
                  Resend code in <span className="font-semibold text-neutral-900">{countdown}s</span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={onResend}
                  className="font-semibold text-neutral-900 hover:underline cursor-pointer disabled:opacity-50"
                >
                  Didn&apos;t receive code? Resend Code
                </button>
              )}
            </div>


            <Button
              type="submit"
              disabled={isLoading}
              className="rounded-none bg-neutral-900 hover:bg-neutral-800 text-white py-5 px-8 cursor-pointer"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" />
                  Verifying...
                </span>
              ) : (
                "Verify"
              )}
            </Button>


          </div>

        </form>
      </Form>

    </div>
  );
}