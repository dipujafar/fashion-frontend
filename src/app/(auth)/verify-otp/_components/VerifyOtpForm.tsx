"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useRouter, useSearchParams } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useVerifyOtpMutation, useResendOtpMutation } from "@/redux/api/authApi";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/types";
import { jwtDecode } from "jwt-decode";
import { getRoleKey } from "@/data/dummyData.tsx/userRoleData";
import { Loader2 } from "lucide-react";

const RESEND_SECONDS = 60;

// ✅ Define form validation schema using Zod
const formSchema = z.object({
  otp: z
    .string()
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

const safeDecodeRole = (token?: string | null): UserRole | null => {
  if (!token) return null;
  try {
    const decoded = jwtDecode<{ role?: UserRole }>(token);
    return decoded?.role || null;
  } catch {
    return null;
  }
};

const VerifyOtpForm = () => {
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  const [email, setEmail] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(RESEND_SECONDS);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("otpEmail");
    if (!storedEmail) {
      router.replace("/sign-in");
      return;
    }
    setEmail(storedEmail);
  }, [router]);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResendOtp = async () => {
    if (!email || countdown > 0 || isResending) return;

    try {
      const res = await resendOtp({ email }).unwrap();
      const newToken = res?.data?.otpToken || res?.data?.token;
      if (newToken) {
        if (status === "forgot") {
          sessionStorage.setItem("forgotPasswordToken", newToken);
        } else {
          sessionStorage.setItem("verifyOtpToken", newToken);
        }
      }
      setCountdown(RESEND_SECONDS);
      toast.success(res?.message || "A new verification code has been sent to your email.");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to resend OTP");
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (status === "forgot") {
      try {
        const res = await verifyOtp(data).unwrap();
        if (res?.data?.accessToken) {
          sessionStorage.setItem("resetPasswordToken", res?.data?.accessToken);
          sessionStorage.removeItem("forgotPasswordToken");
          sessionStorage.removeItem("otpEmail");
          toast.success("OTP verified successfully! Please reset your password.");
          router.push("/set-new-password");
        }
      } catch (error: any) {
        toast.error(error?.data?.message || "Something went wrong");
      }
    } else {
      try {
        const currentOtpToken = sessionStorage.getItem("verifyOtpToken");
        const res = await verifyOtp(data).unwrap();

        const finishToken = res?.data?.accessToken || res?.data?.token;

        const resolvedRole: UserRole | null =
          (sessionStorage.getItem("signupRole") as UserRole | null) ||
          res?.data?.user?.auth?.role ||
          res?.data?.role ||
          safeDecodeRole(finishToken) ||
          safeDecodeRole(currentOtpToken);

        sessionStorage.removeItem("verifyOtpToken");
        sessionStorage.removeItem("otpEmail");

        if (resolvedRole && resolvedRole !== UserRole.INDIVIDUAL_USER) {
          const encodeRole = getRoleKey(resolvedRole);

          if (finishToken) {
            sessionStorage.setItem("signUpToken", finishToken);
          }
          sessionStorage.setItem("signupRole", resolvedRole);
          toast.success("OTP verified! Please complete your verification details.");
          router.push(`/sign-up/${encodeRole}/finish`);
        } else {
          sessionStorage.removeItem("signupRole");
          toast.success("OTP verified successfully! Please login.");
          router.push("/sign-in");
        }
      } catch (error: any) {
        toast.error(error?.data?.message || "Something went wrong");
      }
    }
  };

  if (!email) {
    return null;
  }

  return (
    <Card className="max-w-lg mx-auto shadow-none border-none">
      <CardContent>
        <div className="my-5 lg:my-8 space-y-2">
          <h3 className="text-2xl md:text-3xl font-bold text-center">Verify Your Email</h3>
          <p className="text-secondary-gray text-center">
            A 6-digit code has been sent to{" "}
            <span className="font-semibold text-gray-900">{email}</span>. Please enter the code below to verify your email.
          </p>
        </div>

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
                              className="border size-10 sm:size-12 lg:size-16 text-xl"
                            />
                          ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-center text-sm text-secondary-gray">
              {countdown > 0 ? (
                <p>
                  Resend code in{" "}
                  <span className="font-semibold text-gray-900">{countdown}s</span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isResending}
                  className="inline-flex items-center gap-1.5 font-semibold text-primary-black hover:underline cursor-pointer disabled:opacity-50"
                >
                  {isResending ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin" />
                      Resending...
                    </>
                  ) : (
                    "Didn't receive code? Resend OTP"
                  )}
                </button>
              )}
            </div>

            <Button
              variant={"default"}
              disabled={isLoading}
              type="submit"
              className="rounded-full h-11 w-full cursor-pointer text-base"
            >
              {isLoading ? <span className="loader"></span> : "Verify Code"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default VerifyOtpForm;
