"use client";
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
import CommonButton from "@/components/ui/common-button";
import { useRouter, useSearchParams } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useVerifyOtpMutation } from "@/redux/api/authApi";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { Button } from "@/components/ui/button";

// ✅ Define form validation schema using Zod
const formSchema = z.object({
  otp: z
    .string()
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

const VerifyOtpForm = () => {
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const router = useRouter();
  const status = useSearchParams().get("status");
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {

    if (status === "forgot") {
      try {
        const res = await verifyOtp(data).unwrap();
        if (res?.data?.accessToken) {
          sessionStorage.setItem("resetPasswordToken", res?.data?.accessToken);
          sessionStorage.removeItem("forgotPasswordToken");
          toast.success("OTP verified successfully! Please reset your password.");
          router.push("/set-new-password");
        }
      }
      catch (error: any) {
        toast.error(error.data.message);
      }
    }

    else {
      try {
        await verifyOtp(data).unwrap();
        toast.success("OTP verified successfully! Please login.");
        sessionStorage.removeItem("verifyOtpToken");
        router.push("/sign-in");
      } catch (error: any) {
        toast.error(error.data.message);
      }
    }
  };

  return (
    <Card
      className="max-w-lg mx-auto shadow-none border-none"
    >

      <CardContent>

        <div className="my-8 space-y-2">
          <h3 className="text-3xl font-bold text-center">Verify Your Email</h3>
          <p className="text-secondary-gray">A 6-digit code has been sent to your email address. Please enter the code below to verify your email.</p>
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
                      className="border "
                    >
                      <InputOTPGroup className="gap-x-2">
                        {Array(6)
                          .fill(null)
                          .map((_, index) => (
                            <InputOTPSlot
                              key={index}
                              index={index}
                              className="border lg:size-16 text-xl"
                            />
                          ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button variant={"default"} disabled={isLoading} type="submit" className="rounded-full h-11 w-full cursor-pointer text-base">{isLoading ? <span className="loader"></span> : "Verify Code"}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default VerifyOtpForm;
