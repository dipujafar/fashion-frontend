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
import { Button } from "@/components/ui/button";

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
      toast.error(error?.data?.message || "Something went wrong");
    }

  };

  return (
    <Card
      className="max-w-lg mx-auto shadow-none border-none"
    >

      <CardContent>

        <div className="my-8 space-y-2">
          <h3 className="text-3xl font-bold text-center">Forgot Your Password?</h3>
          <p className="text-secondary-gray">Enter the email address associated with your account and we'll send you a link to reset your password.</p>
        </div>

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
                      className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base !py-6 px-3.5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button variant={"default"} disabled={isLoading} type="submit" className="rounded-full h-11 w-full cursor-pointer text-base">{isLoading ? <span className="loader"></span> : "Submit"}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ForgetPassForm;
