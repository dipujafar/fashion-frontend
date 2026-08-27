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
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import appleIcon from "@/assets/icons/apple.png";
import googleIcon from "@/assets/icons/google.png";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useLoginMutation } from "@/redux/api/authApi";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/authSlice";
import { Button } from "@/components/ui/button";

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
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const callbackUrl = useSearchParams().get("callbackUrl");

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await login(data).unwrap();
      if (res?.data?.user?.role) {
        dispatch(
          setUser({
            user: jwtDecode(res?.data?.accessToken),
            accessToken: res?.data?.accessToken,
            refreshToken: res?.data?.refreshToken
          })
        );
        toast.success("Login successful");
        if (callbackUrl)
          router.replace(callbackUrl);
        else
          router.replace("/profile");
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <Card
      className="max-w-lg mx-auto shadow-none border-none">

      <CardContent>

        <h3 className="text-3xl font-bold text-center my-5 lg:mb-8">Welcome Back</h3>

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
                        className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base !py-6 px-3.5"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        {showPassword ? (
                          <div
                            onClick={() => setShowPassword(false)}
                            className="cursor-pointer"
                          >
                            <Eye color="#A5A7A9" className="size-5" />
                          </div>
                        ) : (
                          <div
                            onClick={() => setShowPassword(true)}
                            className="cursor-pointer"
                          >
                            <EyeOff color="#A5A7A9" className="size-5" />
                          </div>
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <Link href="/forget-password">
                <p className="text-gray-700 font-medium hover:text-black duration-500">Forgot Password</p>
              </Link>
            </div>

            <Button variant={"default"} disabled={isLoading} type="submit" className="rounded-full h-11 w-full cursor-pointer text-base">{isLoading ? <span className="loader"></span> : "Sign In"}</Button>

            <div className="flex justify-center gap-x-2 items-center">
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
        <div className="space-y-2 w-full">
          <button className="flex items-center gap-x-2 justify-center border border-gray-200 rounded-full px-4 py-2.5 hover:bg-zinc-50 hover:border-primary-black transition-colors duration-300 w-full shadow-xs cursor-pointer">
            <Image
              src={googleIcon}
              alt="apple_icon"
              className="size-5 cursor-pointer"
            ></Image>
            <p className="text-base font-medium">Continue with Google</p>
          </button>
          <button className="flex items-center gap-x-2 justify-center border border-gray-200 rounded-full px-4 py-2.5 hover:bg-zinc-50 hover:border-primary-black transition-colors duration-300 w-full shadow-xs cursor-pointer">
            <Image
              src={appleIcon}
              alt="apple_icon"
              className="size-6 cursor-pointer"
            ></Image>
            <p className="text-base font-medium">Continue with Apple</p>
          </button>

        </div>
      </CardFooter>
    </Card>
  );
};

export default SIgnInForm;
