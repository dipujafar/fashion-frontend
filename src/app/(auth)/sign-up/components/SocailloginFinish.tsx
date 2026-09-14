import { UserRole } from '@/types'
import { getFirstErrorMessage } from '@/utils/modifyFormError';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

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
import { useSocialSignupMutation } from '@/redux/api/authApi';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { setUser } from '@/redux/features/authSlice';

const formSchema = z.object({
  fname: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name is required" }),

  userName: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores are allowed")
    .refine((val) => !/^\d/.test(val), {
      message: "Username cannot start with a number",
    })

})

function SocailloginFinish({ socialLoginToken, role, isCharity = false }: { socialLoginToken: { token: string, name: string | null }, role: UserRole, isCharity?: boolean }) {

  const [createAccount, { isLoading }] = useSocialSignupMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fname: socialLoginToken?.name || "",
    }
  });

  const callbackUrl = useSearchParams().get("callbackUrl");

  const router = useRouter();

  const dispatch = useAppDispatch();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {

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
                  <Input
                    placeholder="Username"
                    {...field}
                    className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base !py-6 px-3.5"
                  />
                </FormControl>
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