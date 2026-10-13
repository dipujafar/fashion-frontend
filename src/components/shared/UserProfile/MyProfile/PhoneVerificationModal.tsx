"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";
import { SendPhoneVerificationOtp } from "@/lib/Actions/Profile.action";
import { PhoneStep } from "./PhoneStep";
import { OtpStep } from "./OtpForm";
import { useResendPhoneOtpMutation } from "@/redux/api/authApi";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { invalidatePath } from "@/lib/Actions/Revalidate.action";


interface PhoneVerificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPhone?: string;
  title: string;
}

const RESEND_SECONDS = 60;

export function PhoneVerificationModal({
  open,
  onOpenChange,
  currentPhone,
  title
}: PhoneVerificationModalProps) {

  const [requestOtp, { isLoading, error, isSuccess, isError }] = useResendPhoneOtpMutation();

  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState(currentPhone || "");
  const [countdown, setCountdown] = useState(0);
  const [token, setToken] = useState("");

  // Reset when the modal opens
  useEffect(() => {
    if (open) {
      setStep("phone");
      setPhone(currentPhone || "");
      setCountdown(0);
    }
  }, [open, currentPhone]);

  // Resend countdown
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  // Shared by "Send Code" and "Resend Code". Throws on failure so callers can show the error.
  const sendOtp = async (value: string) => {
    try {
      const res = await requestOtp({ phone: value }).unwrap();
      setToken(res.data?.token);

      setPhone(value);
      setStep("otp");
      setCountdown(RESEND_SECONDS);
    } catch (error: any) {
      if (isRedirectError(error)) {
        throw error; // Let Next.js handle the redirect
      }
    }
  };

  const handleVerified = async () => {
    await invalidatePath("/profile");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-6 rounded-none max-h-screen">
        {step === "phone" ? (
          <PhoneStep
            defaultPhone={phone}
            onSubmit={sendOtp}
            onCancel={() => onOpenChange(false)}
            title={title}
            isSending={isLoading}
            sendingError={getErrorMessage(error, "Failed to send verification code")}
            isError={isError}
          />
        ) : (
          <OtpStep
            phone={phone}
            countdown={countdown}
            onResend={() => setStep("phone")}
            onBack={() => setStep("phone")}
            onCancel={() => onOpenChange(false)}
            onVerified={handleVerified}
            token={token}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}