import { UserRole } from '@/types'
import { getFirstErrorMessage } from '@/utils/modifyFormError';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { Check, X, Loader2 } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSocialSignupMutation, useCheckUsernameMutation } from '@/redux/api/authApi';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { setUser } from '@/redux/features/authSlice';
import { userNameSchema } from './SignSchema';

const formSchema = z.object({
  fname: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name is required" }),

  userName: userNameSchema,
});

function SocailloginFinish({ socialLoginToken, role, isCharity = false }: { socialLoginToken: { token: string, name: string | null }, role: UserRole, isCharity?: boolean }) {

  const [createAccount, { isLoading,isError, error }] = useSocialSignupMutation();
  const [checkUsername] = useCheckUsernameMutation();
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [usernameMessage, setUsernameMessage] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fname: socialLoginToken?.name || "",
    }
  });

  const callbackUrl = useSearchParams().get("callbackUrl");

  const router = useRouter();

  const dispatch = useAppDispatch();

  const watchedUsername = form.watch("userName");

  useEffect(() => {
    if (!watchedUsername || watchedUsername.trim() === "") {
      setUsernameAvailable(null);
      setUsernameMessage("");
      setIsCheckingUsername(false);
      return;
    }

    const trimmed = watchedUsername.trim();

    // 1. Must pass username validation before calling API
    const validationResult = userNameSchema.safeParse(trimmed);
    if (!validationResult.success) {
      setUsernameAvailable(null);
      setUsernameMessage("");
      setIsCheckingUsername(false);
      return;
    }

    // 2. Debounce API call
    setIsCheckingUsername(true);
    setUsernameAvailable(null);
    setUsernameMessage("");

    const timer = setTimeout(async () => {
      try {
        const res = await checkUsername({ userName: trimmed }).unwrap();
        const isUnavailable =
          res?.data?.isAvailable === false ||
          res?.data?.available === false ||
          res?.success === false;

        if (isUnavailable) {
          const msg = res?.message || "Username is already taken";
          setUsernameAvailable(false);
          setUsernameMessage(msg);
          form.setError("userName", { type: "manual", message: msg });
        } else {
          const msg = res?.message || "Username is available";
          setUsernameAvailable(true);
          setUsernameMessage(msg);
          form.clearErrors("userName");
        }
      } catch (error: any) {
        const msg = error?.data?.message || error?.message || "Username is already taken";
        setUsernameAvailable(false);
        setUsernameMessage(msg);
        form.setError("userName", { type: "manual", message: msg });
      } finally {
        setIsCheckingUsername(false);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [watchedUsername, checkUsername, form]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (isCheckingUsername) {
      toast.info("Please wait while we verify your username.");
      return;
    }

    if (usernameAvailable === false) {
      form.setError("userName", {
        type: "manual",
        message: usernameMessage || "Username is already taken",
      });
      return;
    }

    try {
      const res = await createAccount({ ...data, role: role, idToken: socialLoginToken?.token }).unwrap();
      if (res?.data?.user?.auth?.role) {
        dispatch(
          setUser({
            user: res?.data?.user,
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
      toast.error(error?.data?.message || "An error occurred while creating the account.");
    }
  };

  const onError = (errors: any) => {
    const firstErrorMessage = getFirstErrorMessage(errors);
    toast.error(firstErrorMessage);
  };

  return (
    <div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="md:space-y-6 space-y-4">

          <FormField
            control={form.control}
            name="fname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{isCharity ? "Organization Name" : "First Name"}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={isCharity ? "Organization Name" : "First Name"}
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
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Username"
                      {...field}
                      className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base !py-6 px-3.5 pr-10"
                    />
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                      {isCheckingUsername && (
                        <Loader2 className="size-4.5 animate-spin text-gray-400" />
                      )}
                      {!isCheckingUsername && usernameAvailable === true && (
                        <Check className="size-4.5 text-green-600" />
                      )}
                      {!isCheckingUsername && usernameAvailable === false && (
                        <X className="size-4.5 text-red-500" />
                      )}
                    </div>
                  </div>
                </FormControl>
                {!isCheckingUsername && usernameAvailable === true && (
                  <p className="text-xs text-green-600 font-medium flex items-center gap-1 mt-1">
                    <Check className="size-3.5" /> Username is available
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <Button variant={"default"} disabled={isLoading} type="submit" className="rounded-full h-11 w-full cursor-pointer text-base">{isLoading ? <span className="loader"></span> : "Finish"}</Button>

        </form>
      </Form>
    </div>
  )
}

export default SocailloginFinish