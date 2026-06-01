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
import CountryStateCitySelector from "@/components/ui/country-state-city-selector";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { useUpdateBillingDetailsMutation } from "@/redux/api/userApi";
import { IBillingDetails } from "@/types";
import { toast } from "sonner";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  country: z.string().min(1, "Please select a country"),
  streetAddress: z.string().min(5, "Street address is required"),
  city: z.string().min(1, "Please select a city"),
  state: z.string().min(1, "Please select a state"),
  zipCode: z.string().min(1, "Zip code must be at least 1 characters"),

  email: z.string().email("Please enter a valid email address"),
});

type FormData = z.infer<typeof formSchema>;


export default function BillingAddressForm({ defaultValue }: { defaultValue: IBillingDetails | null }) {
  const [handleUpdate, { isLoading }] = useUpdateBillingDetailsMutation();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: defaultValue?.full_name,
      country: defaultValue?.country,
      streetAddress: defaultValue?.address1,
      city: defaultValue?.city,
      state: defaultValue?.state,
      zipCode: defaultValue?.zip_code,
      phoneNumber: defaultValue?.contact,
      email: defaultValue?.email ?? undefined
    },
  });

  const { register, setValue, control } = form;

  const onSubmit = async (data: FormData) => {
    try {
      const body: IBillingDetails = {
        address1: data?.streetAddress,
        city: data?.city,
        contact: data?.phoneNumber,
        country: data?.country,
        full_name: data?.fullName,
        state: data?.state,
        zip_code: data?.zipCode,
        email: data?.email
      }
      const res = await handleUpdate(body).unwrap();
      toast.success("Billing details updated successfully")
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong, try again")
      // console.error("Error submitting form:", error);
    }
  };

  return (

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
                    className="bg-[#F5F5F5] md:py-5"
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

        {/* Country, State, City Selector */}
        <div className="grid w-full  items-center gap-1.5">
          <Label>Location</Label>
          <CountryStateCitySelector
            userAddress={{ country: defaultValue?.country, state: defaultValue?.state, city: defaultValue?.city }}
            control={control}
            setValue={setValue}
            register={register}
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
                  className="bg-[#F5F5F5] md:py-5"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4 lg:pt-4">
          <Button size={"lg"} type="submit" disabled={isLoading} className="flex-1 group cursor-pointer">
            {isLoading ? "Processing..." : "Save Changes"}
            {/* <AnimatedArrow /> */}
          </Button>
        </div>
      </form>
    </Form>

  );
}
