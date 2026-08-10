"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { IBillingDetails } from "@/types";
import { toast } from "sonner";
import SelectCountry from "./SelectCountry";
import { LoadScriptNext } from "@react-google-maps/api"
import { EnvConfig } from "@/config";
import SelectAddress from "./SelectAddress";
import { useState } from "react";
import { updateShippingDetails } from "@/lib/Actions/Cart.action";
import { useAppDispatch } from "@/redux/hooks";
import { clearCart } from "@/redux/features/cart.slice";

const GOOGLE_MAPS_API_KEY = EnvConfig.MAP_KEY!

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  country: z.string().min(1, "Please select a country"),
  countryCode: z.string().min(1, "Please select a country"),
  streetAddress: z.string().min(5, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(3, "Zip code must be at least 3 characters"),

  email: z.string().email("Please enter a valid email address"),
});

type FormData = z.infer<typeof formSchema>;


export default function BillingAddressForm({ defaultValue, onOpenChange }: { defaultValue: IBillingDetails | null; onOpenChange: (open: boolean) => void }) {
  // const [handleUpdate, { isLoading }] = useUpdateBillingDetailsMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: defaultValue?.full_name,
      country: defaultValue?.country,
      countryCode: defaultValue?.countryCode,
      streetAddress: defaultValue?.address1,
      city: defaultValue?.city,
      state: defaultValue?.state,
      zipCode: defaultValue?.zip_code,
      phoneNumber: defaultValue?.contact,
      email: defaultValue?.email ?? undefined
    },
  });

  const { control } = form;

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const body: IBillingDetails = {
        address1: data?.streetAddress,
        city: data?.city,
        contact: data?.phoneNumber,
        country: data?.country,
        countryCode: data?.countryCode,
        full_name: data?.fullName,
        state: data?.state,
        zip_code: data?.zipCode,
        email: data?.email
      }

      await updateShippingDetails(body);
      toast.success("Billing details updated successfully")
      dispatch(clearCart());
      onOpenChange(false);
    } catch (error: any) {
      setError(error?.message || "Something went wrong, try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoadScriptNext googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* First Name and Last Name */}
          <div>
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      {...field}
                      className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base !py-5 px-3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <PhoneInput
                    // @ts-ignore
                    value={field.value}
                    onChange={field.onChange}
                    international
                    defaultCountry="US"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SelectAddress control={control} setValue={form.setValue} />

          {/* Country */}
          <SelectCountry
            control={control}
            setValue={form.setValue}
          />

          {/* State */}
          <div>
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State/County</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your state"
                      {...field}
                      className="bg-white border-[#e1e1e1] md:py-5 rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base !py-5 px-3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>


          <div className="grid grid-cols-2 gap-3 items-start">
            {/* City */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your city"
                      {...field}
                      className="bg-white border-[#e1e1e1] md:py-5 rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base !py-5 px-3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip/Post Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your zip/post code"
                      {...field}
                      className="bg-white border-[#e1e1e1] md:py-5 rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black !text-base !py-5 px-3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>


          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Email Address"
                    type="email"
                    className="bg-white border-[#e1e1e1] md:py-5 rounded shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black text-lg md:text-base py-5"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && (
            <div className="rounded border border-red-300 bg-red-50 px-3 py-2">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="flex gap-4">
            <Button size={"lg"} type="submit" disabled={isLoading} className="flex-1 group cursor-pointer rounded-none py-6 text-base font-semibold">
              {isLoading ? <span className="loader" /> : "Save Changes"}
              {/* <AnimatedArrow /> */}
            </Button>
          </div>
        </form>
      </Form>
    </LoadScriptNext>
  );
}
