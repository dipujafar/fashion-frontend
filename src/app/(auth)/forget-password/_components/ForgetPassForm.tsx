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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CommonButton from "@/components/ui/common-button";
import { useRouter } from "next/navigation";
import { useForgotPasswordMutation } from "@/redux/api/authApi";
import { toast } from "sonner";

const formSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
});

const ForgetPassForm = () => {
  const router = useRouter();
  const [forgetPass, { isLoading }] = useForgotPasswordMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await forgetPass(data).unwrap();
      if (res?.data?.token) {
        sessionStorage.setItem("forgotPasswordToken", res?.data?.token);
        toast.success("Please verify your email with OTP, which has been sent to your email.");
        router.push(`/verify-otp?status=forgot&email=${data?.email}`);
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }

  };

  return (
    <Card
      className="max-w-[742px] mx-auto shadow-none border-none"
      style={{ boxShadow: "0px 4px 19px 0px rgba(0, 0, 0, 0.14)" }}
    >
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="md:space-y-6 space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Your Email"
                      {...field}
                      className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded bg-[#F5F5F5] md:py-5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CommonButton loading={isLoading} className="w-full">Send</CommonButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ForgetPassForm;
