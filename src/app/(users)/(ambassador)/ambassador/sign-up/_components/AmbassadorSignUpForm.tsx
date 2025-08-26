"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useFieldArray, useForm } from "react-hook-form";
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
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import CommonButton from "@/components/ui/common-button";
import { PhoneInput } from "@/components/ui/PhoneInput";
import facebook from "@/assets/icons/facebook.png";
import instagram from "@/assets/icons/instagram.png";
import tiktok from "@/assets/icons/tiktokIcon.png";
import XIcon from "@/assets/icons/x-icon.png";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import CountryStateCitySelector from "@/components/ui/country-state-city-selector";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  firstName: z
    .string({ required_error: "First Name is required" })
    .min(1, { message: "First Name is required" }),
  lastName: z
    .string({ required_error: "Last Name is required" })
    .min(1, { message: "Last Name is required" }),
  userName: z
    .string({ required_error: "User Name is required" })
    .min(1, { message: "User Name is required" }),
  phoneNumber: z
    .string({ required_error: "Phone Number is required" })
    .min(1, { message: "Phone Number is required" }),
  description: z.string().min(1, "Description is required"),
  email: z
    .string({ required_error: "Email is required" })
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, { message: "Password is required" })
    .min(8, { message: "passwords must be at least 8 characters long" })
    .max(64, { message: "passwords must be at most 64 characters long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
      }
    ),
  confirmPassword: z
    .string({ required_error: "Confirm Password is required" })
    .min(1, { message: "Confirm Password is required" }),
  country: z.string().min(1, "Please select a country"),
  streetAddress: z.string().min(5, "Street address is required"),
  city: z.string().min(1, "Please select a city"),
  state: z.string().min(1, "Please select a state"),
  zipCode: z.string().min(5, "Zip code must be at least 5 characters"),

  socialMedia: z.array(
    z.object({
      instagram: z.string().optional(),
      facebook: z.string().optional(),
      x: z.string().optional(),
      tiktok: z.string().optional(),
    })
  ),
});

const AmbassadorSignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      country: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      description: "",
    },
  });

  const { register, setValue, control } = form;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "socialMedia",
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "confirmPassword" || name === "password") {
        if (value.confirmPassword && value.password !== value.confirmPassword) {
          form.setError("confirmPassword", {
            type: "manual",
            message: "Passwords do not match",
          });
        } else {
          form.clearErrors("confirmPassword");
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <Card
      className="max-w-[742px] mx-auto shadow-none border-none"
      style={{ boxShadow: "0px 4px 19px 0px rgba(0, 0, 0, 0.14)" }}
    >
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex-1 flex justify-center items-center bg-primary-black text-primary-white px-2.5 py-3">
            Sign Up
          </div>

          <Link
            href={"/sign-in"}
            className="flex-1 flex justify-center items-center px-2.5 py-3"
          >
            Sign In
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="md:space-y-6 space-y-4"
          >
            <div className=" flex flex-col md:flex-row md:items-center  gap-4 ">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Your First Name"
                          {...field}
                          className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded bg-[#F5F5F5] md:py-5 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Your Last Name"
                          {...field}
                          className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded bg-[#F5F5F5] md:py-5 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Your User Name"
                      {...field}
                      className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded bg-[#F5F5F5] md:py-5 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <div>
              <label className="text-sm font-medium mb-2">
                Social Media Link (Optional)
              </label>
              <div className="grid sm:grid-cols-2  gap-4">
                <div className="flex items-center gap-x-2">
                  <Image
                    src={instagram}
                    alt="logo"
                    className="w-[40px] h-[40px]"
                  />
                  <Input
                    {...form.register(`socialMedia.${0}.instagram`)}
                    type="text"
                    placeholder="Enter Your Instagram Link"
                    className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded bg-[#F5F5F5] md:py-5"
                  />
                </div>
                <div className="flex items-center gap-x-2">
                  <Image
                    src={facebook}
                    alt="logo"
                    className="w-[40px] h-[40px]"
                  />
                  <Input
                    {...form.register(`socialMedia.${0}.facebook`)}
                    type="text"
                    placeholder="Enter Your Facebook Link"
                    className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded bg-[#F5F5F5] md:py-5"
                  />
                </div>
                <div className="flex items-center gap-x-2">
                  <Image src={XIcon} alt="logo" className="w-[40px] h-[40px]" />
                  <Input
                    {...form.register(`socialMedia.${0}.x`)}
                    type="text"
                    placeholder="Enter Your X Link"
                    className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded bg-[#F5F5F5] md:py-5"
                  />
                </div>
                <div className="flex items-center gap-x-2">
                  <Image
                    src={tiktok}
                    alt="logo"
                    className="w-[40px] h-[40px]"
                  />
                  <Input
                    {...form.register(`socialMedia.${0}.tiktok`)}
                    type="text"
                    placeholder="Enter Your Tiktok Link"
                    className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded bg-[#F5F5F5] md:py-5"
                  />
                </div>
              </div>
            </div>

            <div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us something what your description......."
                        {...field}
                        className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded bg-[#F5F5F5] h-[100px] "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* ________________ location ________________________ */}
            {/* Country, State, City Selector */}
            <div className="grid w-full  items-center gap-1.5">
              <Label>Location</Label>
              <CountryStateCitySelector
                control={control}
                setValue={setValue}
                register={register}
              />
            </div>

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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Enter Your Password"
                        {...field}
                        className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded bg-[#F5F5F5] md:py-5"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        {showConfirmPassword ? (
                          <div
                            onClick={() => setShowConfirmPassword(false)}
                            className="cursor-pointer"
                          >
                            <Eye color="#A5A7A9" />
                          </div>
                        ) : (
                          <div
                            onClick={() => setShowConfirmPassword(true)}
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

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                className="border-black"
                checked={agree}
                onCheckedChange={() => setAgree(!agree)}
              />
              <label htmlFor="terms" className="text-secondary-gray">
                By hitting the "Register" button, you agree to the{" "}
                <Link
                  href={"/terms-use"}
                  className="text-primary-red font-medium"
                >
                  Terms conditions
                </Link>{" "}
                &{" "}
                <Link
                  href={"/privacy-policy"}
                  className="text-primary-red font-medium"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            <CommonButton disabled={!agree} className="w-full">
              SIGN UP
            </CommonButton>

            <div className="flex justify-center gap-x-2">
              <p className="text-secondary-gray">Have an account?</p>
              <Link href={"/sign-in"}>
                <span className="text-lg text-primary-red font-medium underline">
                  Sign In
                </span>
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AmbassadorSignUpForm;
