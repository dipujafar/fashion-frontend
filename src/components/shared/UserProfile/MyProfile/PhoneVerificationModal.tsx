"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Phone, ShieldCheck, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import {
  SendPhoneVerificationOtp,
  VerifyPhoneOtpAction,
  UpdateProfile,
} from "@/lib/Actions/Profile.action";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneInput } from "@/components/ui/PhoneInput";

interface PhoneVerificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPhone?: string;
  onPhoneVerified: (newPhone: string) => void;
}

const formSchema = z.object({
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
});

type FormData = z.infer<typeof formSchema>;

export function PhoneVerificationModal({
  open,
  onOpenChange,
  currentPhone,
  onPhoneVerified,
}: PhoneVerificationModalProps) {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [otpError, setOtpError] = useState("");

  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Countdown timer for OTP resend (60 seconds)
  const [countdown, setCountdown] = useState(0);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: currentPhone || "",
    },
  });

  const { control } = form;

  const onSubmit = async (data: FormData) => {

  }


  // Reset modal state when opened/closed
  useEffect(() => {
    if (open) {
      setStep("phone");
      setPhone(currentPhone || "");
      setOtp("");
      setPhoneError("");
      setOtpError("");
      setCountdown(0);
    }
  }, [open, currentPhone]);

  // Countdown timer interval
  useEffect(() => {
    if (countdown <= 0) return;
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  // Validate phone number format
  const validatePhone = (value: string): boolean => {
    const cleaned = value.trim();
    if (!cleaned) {
      setPhoneError("Phone number is required");
      return false;
    }
    // At least 7 digits, allowed characters: digits, spaces, plus, hyphens, parentheses
    const digitsOnly = cleaned.replace(/\D/g, "");
    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      setPhoneError("Please enter a valid phone number (7-15 digits)");
      return false;
    }
    setPhoneError("");
    return true;
  };

  // Step 1: Send OTP
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validatePhone(phone)) return;

    setIsSendingOtp(true);
    setPhoneError("");

    try {
      const res = await SendPhoneVerificationOtp({ payload: { phone: phone.trim() } });
      if (!res.success) {
        throw new Error(res.message);
      }
      toast.success(res.message || `Verification code sent to ${phone}`);
      setStep("otp");
      setCountdown(60);
      setOtp("");
      setOtpError("");
    } catch (err: any) {
      setPhoneError(err?.message || "Failed to send verification code. Please try again.");
      toast.error(err?.message || "Failed to send verification code");
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Step 2: Verify 6-digit OTP
  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (otp.length !== 6) {
      setOtpError("Please enter the complete 6-digit verification code");
      return;
    }

    setIsVerifying(true);
    setOtpError("");

    try {
      const verifiedPhone = phone.trim();
      const res = await VerifyPhoneOtpAction({
        payload: { phone: verifiedPhone, otp: otp.trim() },
      });

      if (!res.success) {
        throw new Error(res.message);
      }

      // Also persist the verified phone number to user profile
      const formData = new FormData();
      formData.append("data", JSON.stringify({ phone: verifiedPhone }));
      await UpdateProfile({ payload: formData });

      toast.success("Phone number verified and updated successfully!");
      onPhoneVerified(verifiedPhone);
      onOpenChange(false);
    } catch (err: any) {
      setOtpError(err?.message || "Invalid or expired verification code. Please try again.");
      toast.error(err?.message || "Verification failed");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-6  rounded-none max-h-screen">
        {step === "phone" ? (
          /* ================= STEP 1: Phone Input Form ================= */
          <div className="space-y-5">
            <DialogHeader className="text-left space-y-2">
              <div className="size-11 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-900 mb-1">
                <Phone className="size-5" />
              </div>
              <DialogTitle className="text-xl font-bold text-neutral-900 tracking-tight">
                {currentPhone ? "Change Phone Number" : "Add Phone Number"}
              </DialogTitle>
              <DialogDescription className="text-sm text-neutral-500">
                {currentPhone
                  ? "Enter your new phone number. We will send a 6-digit verification code to confirm."
                  : "Enter your phone number to receive a 6-digit verification code."}
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form className="space-y-4">

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <PhoneInput
                          // @ts-ignore
                          value={field.value}
                          onChange={field.onChange}
                          international
                          defaultCountry="US"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    disabled={isSendingOtp}
                    className="rounded-none border-neutral-300 hover:bg-neutral-100 text-neutral-800 cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSendingOtp || !phone.trim()}
                    className="rounded-none bg-neutral-900 hover:bg-neutral-800 text-white cursor-pointer"
                  >
                    {isSendingOtp ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="size-4 animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      "Send Code"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        ) : (
          /* ================= STEP 2: 6-Digit OTP Verification ================= */
          <div className="space-y-5">
            <DialogHeader className="text-left space-y-2">
              <div className="flex items-center justify-between">
                <div className="size-11 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-900">
                  <ShieldCheck className="size-5" />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStep("phone");
                    setOtp("");
                    setOtpError("");
                  }}
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

            <form onSubmit={handleVerifyOtp} className="space-y-5">
              {/* 6-digit OTP Input */}
              <div className="flex flex-col items-center justify-center space-y-2 py-2">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(val) => {
                    setOtp(val);
                    if (otpError) setOtpError("");
                  }}
                  autoFocus
                  disabled={isVerifying}
                >
                  <InputOTPGroup className="gap-2 sm:gap-2.5">
                    <InputOTPSlot index={0} className="size-11 sm:size-12 text-lg font-bold border-neutral-300 rounded-lg" />
                    <InputOTPSlot index={1} className="size-11 sm:size-12 text-lg font-bold border-neutral-300 rounded-lg" />
                    <InputOTPSlot index={2} className="size-11 sm:size-12 text-lg font-bold border-neutral-300 rounded-lg" />
                    <InputOTPSlot index={3} className="size-11 sm:size-12 text-lg font-bold border-neutral-300 rounded-lg" />
                    <InputOTPSlot index={4} className="size-11 sm:size-12 text-lg font-bold border-neutral-300 rounded-lg" />
                    <InputOTPSlot index={5} className="size-11 sm:size-12 text-lg font-bold border-neutral-300 rounded-lg" />
                  </InputOTPGroup>
                </InputOTP>

                {otpError && (
                  <p className="text-xs text-red-600 font-medium text-center mt-1">
                    {otpError}
                  </p>
                )}
              </div>

              {/* Resend Countdown */}
              <div className="text-center text-xs text-neutral-500">
                {countdown > 0 ? (
                  <p>
                    Resend code in{" "}
                    <span className="font-semibold text-neutral-900">{countdown}s</span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSendOtp()}
                    disabled={isSendingOtp}
                    className="font-semibold text-neutral-900 hover:underline cursor-pointer disabled:opacity-50"
                  >
                    Didn&apos;t receive code? Resend Code
                  </button>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isVerifying}
                  className="rounded-lg border-neutral-300 hover:bg-neutral-100 text-neutral-800"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isVerifying || otp.length !== 6}
                  className="rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white min-w-32 cursor-pointer"
                >
                  {isVerifying ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="size-4 animate-spin" />
                      Verifying...
                    </span>
                  ) : (
                    "Verify & Add"
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
