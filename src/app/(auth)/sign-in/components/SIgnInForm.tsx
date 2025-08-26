"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
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
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import CommonButton from "@/components/ui/common-button";
import appleIcon from "@/assets/icons/apple.png";
import googleIcon from "@/assets/icons/google.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, { message: "Password is required" })
    .min(6, { message: " passwords must be at least 8 characters long" })
    .max(64, { message: " passwords must be at most 64 characters long" }),
});

const SIgnInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (data.email === "individualuser@gmail.com" && data.password === "112233") {
      router.push("/individual-user/profile");
      return;
    }

    if(data?.email === "charityshop@gmail.com" && data?.password === "112233"){
      router.push("/charity-shop/profile");
      return;

    }
    if(data?.email === "charity@gmail.com" && data?.password === "112233"){
      router.push("/charity/profile");
      return;

    }
    if(data?.email === "celebrity@gmail.com" && data?.password === "112233"){
      router.push("/celebrity/profile");
      return;

    }
    if(data?.email === "professionalseller@gmail.com" && data?.password === "112233"){
      router.push("/professional-seller/profile");
      return;

    }
    if(data?.email === "ambassador@gmail.com" && data?.password === "112233"){
      router.push("/ambassador/profile");
      return;
    }
    if(data?.email === "ecofriendlystore@gmail.com" && data?.password === "112233"){
      router.push("/eco-friendly-store/profile");
      return;
    }

    if(data?.email === "assistedseller@gmail.com" && data?.password === "112233"){
      router.push("/assisted-seller/profile");
      return;
    }
  };

  return (
    <Card
      className="max-w-[742px] mx-auto shadow-none border-none"
      style={{ boxShadow: "0px 4px 19px 0px rgba(0, 0, 0, 0.14)" }}
    >
      <CardHeader>
        <div className="flex justify-between">
          <Link
            href={"/sign-up"}
            className="flex-1 flex justify-center items-center px-2.5 py-3"
          >
            Sign Up
          </Link>

          <div className="flex-1 flex justify-center items-center bg-primary-black text-primary-white px-2.5 py-3">
            Sign In
          </div>
        </div>
      </CardHeader>
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Your Password"
                        {...field}
                        className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded bg-[#F5F5F5] md:py-5"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        {showPassword ? (
                          <div
                            onClick={() => setShowPassword(false)}
                            className="cursor-pointer"
                          >
                            <Eye color="#A5A7A9" />
                          </div>
                        ) : (
                          <div
                            onClick={() => setShowPassword(true)}
                            className="cursor-pointer"
                          >
                            <EyeOff color="#A5A7A9" />
                          </div>
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col justify-between gap-y-3 md:flex-row">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label htmlFor="terms" className="text-secondary-gray">
                  Remember me
                </label>
              </div>
              <Link href="/forget-password">
                <p className="text-secondary-gray">Forgot Password</p>
              </Link>
            </div>

            <CommonButton className="w-full">SIGN IN</CommonButton>

            <div className="flex justify-center gap-x-2">
              <p className="text-secondary-gray">Don&apos;t have an account?</p>
              <Link href={"/sign-up"}>
                <span className="text-lg text-primary-red font-medium underline">
                  Sign Up
                </span>
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col gap-y-3">
        <div className="flex  items-center justify-center w-full gap-x-2 text-primary-gray">
          <span className="w-16 h-[0.5px] bg-primary-gray"></span>
          <p className="w-fit">Or, Log in with </p>
          <span className="w-16   h-[0.5px] bg-primary-gray"></span>
        </div>
        <div className="flex items-center justify-center gap-x-3">
          <Image
            src={googleIcon}
            alt="apple_icon"
            className="size-8 cursor-pointer"
          ></Image>
          <Image
            src={appleIcon}
            alt="apple_icon"
            className="size-8 cursor-pointer"
          ></Image>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SIgnInForm;
