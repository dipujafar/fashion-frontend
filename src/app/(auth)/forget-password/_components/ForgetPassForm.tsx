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

const formSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
});

const ForgetPassForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    router.push("/verify-otp");
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

            <CommonButton className="w-full">Send</CommonButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ForgetPassForm;
