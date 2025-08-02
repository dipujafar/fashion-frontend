"use client";
import type React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Trash2, Upload, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import CommonButton from "@/components/ui/common-button";
import { PhoneInput } from "@/components/ui/PhoneInput";
import facebook from "@/assets/icons/facebook.png";
import XIcon from "@/assets/icons/x-icon.png";
import Image from "next/image";
import instagram from "@/assets/icons/instagram.png";
import tiktok from "@/assets/icons/tiktokIcon.png";
import DonationTypeDialog from "./DonationTypeDialog";
import { Label } from "@/components/ui/label";
import CountryStateCitySelector from "@/components/ui/country-state-city-selector";

const formSchema = z.object({
  firstName: z
    .string({ required_error: "First Name is required" })
    .min(1, { message: "First Name is required" }),
  lastName: z
    .string({ required_error: "Last Name is required" })
    .min(1, { message: "Last Name is required" }),
  userName: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name is required" }),
  businessEmail: z
    .string({ required_error: "Business Email is required" })
    .min(1, { message: "Business Email is required" })
    .email({ message: "Please enter a valid email address" }),
  phoneNumber: z
    .string({ required_error: "Phone Number is required" })
    .min(1, { message: "Phone Number is required" }),
  businessTags: z
    .array(z.string())
    .min(1, { message: "At least one business tag is required" }),
  socialMedia: z.object({
    facebook: z.string().optional(),
    x: z.string().optional(),
    tiktok: z.string().optional(),
    instagram: z.string().optional(),
  }),

  mission: z
    .string({ required_error: "Mission is required" })
    .min(1, { message: "Mission is required" }),
  uploadDocument: z.any().optional(),
  country: z.string().min(1, "Please select a country"),
  streetAddress: z.string().min(5, "Street address is required"),
  city: z.string().min(1, "Please select a city"),
  state: z.string().min(1, "Please select a state"),
  zipCode: z.string().min(5, "Zip code must be at least 5 characters"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, { message: "Password is required" })
    .min(8, { message: "Passwords must be at least 8 characters long" })
    .max(64, { message: "Passwords must be at most 64 characters long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
      }
    ),
  confirmPassword: z
    .string({ required_error: "Confirm Password is required" })
    .min(1, { message: "Confirm Password is required" }),
});

const CharityShopSignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [currentTag, setCurrentTag] = useState("");
  const [businessTags, setBusinessTags] = useState<string[]>([]);
  const [openSelectDonationTypeModal, setOpenSelectDonationTypeModal] =
    useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      userName: "",
      businessEmail: "",
      phoneNumber: "",
      businessTags: [],
      socialMedia: {
        facebook: "",
        x: "",
      },
      mission: "",
      country: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { register, setValue, control } = form;

  const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault();
      if (!businessTags.includes(currentTag.trim())) {
        const newTags = [...businessTags, currentTag.trim()];
        setBusinessTags(newTags);
        form.setValue("businessTags", newTags);
        setCurrentTag("");
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = businessTags.filter((tag) => tag !== tagToRemove);
    setBusinessTags(newTags);
    form.setValue("businessTags", newTags);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      form.setValue("uploadDocument", file);
    }
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // open select donation type modal
    setOpenSelectDonationTypeModal(true);
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
    <>
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
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your first name"
                            {...field}
                            className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded bg-[#F5F5F5] md:py-5"
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
                            placeholder="Enter your last name"
                            {...field}
                            className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded bg-[#F5F5F5] md:py-5"
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
                        placeholder="Enter your user name"
                        {...field}
                        className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded bg-[#F5F5F5] md:py-5"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="businessEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Email Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Your Business Email"
                            {...field}
                            className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded bg-[#F5F5F5] md:py-5"
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
                </div>
              </div>

              <div>
                <FormLabel>Business Tag</FormLabel>
                <div className="space-y-2">
                  <Input
                    placeholder="Write business tag and press enter"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={handleTagKeyPress}
                    className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded bg-[#F5F5F5] md:py-5"
                  />
                  {businessTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {businessTags.map((tag, index) => (
                        <div
                          key={index}
                          className="bg-primary-black text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                        >
                          {tag}
                          <X
                            size={14}
                            className="cursor-pointer"
                            onClick={() => removeTag(tag)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {form.formState.errors.businessTags && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.businessTags.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium mb-2">
                  Social Media Link (Optional)
                </label>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-x-2">
                    <Image
                      src={instagram || "/placeholder.svg"}
                      alt="Facebook"
                      className="w-[40px] h-[40px]"
                    />
                    <Input
                      {...form.register("socialMedia.instagram")}
                      type="text"
                      placeholder="Enter Your Instagram Link"
                      className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded bg-[#F5F5F5] md:py-5"
                    />
                  </div>
                  <div className="flex items-center gap-x-2">
                    <Image
                      src={facebook || "/placeholder.svg"}
                      alt="Facebook"
                      className="w-[40px] h-[40px]"
                    />
                    <Input
                      {...form.register("socialMedia.facebook")}
                      type="text"
                      placeholder="Enter Your Facebook Link"
                      className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded bg-[#F5F5F5] md:py-5"
                    />
                  </div>
                  <div className="flex items-center gap-x-2">
                    <Image
                      src={XIcon || "/placeholder.svg"}
                      alt="X"
                      className="w-[40px] h-[40px]"
                    />
                    <Input
                      {...form.register("socialMedia.x")}
                      type="text"
                      placeholder="Enter Your X Link"
                      className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded bg-[#F5F5F5] md:py-5"
                    />
                  </div>
                  <div className="flex items-center gap-x-2">
                    <Image
                      src={tiktok || "/placeholder.svg"}
                      alt="X"
                      className="w-[40px] h-[40px]"
                    />
                    <Input
                      {...form.register("socialMedia.tiktok")}
                      type="text"
                      placeholder="Enter Your Tiktok Link"
                      className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded bg-[#F5F5F5] md:py-5"
                    />
                  </div>
                </div>
              </div>

              <FormField
                control={form.control}
                name="mission"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mission</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your business mission"
                        {...field}
                        className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded bg-[#F5F5F5] min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel>Upload Document</FormLabel>
                <div className="mt-2">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-[#F5F5F5]">
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex justify-center items-center gap-x-1.5 group">
                        <p className="mt-2 text-sm text-gray-600">
                          {uploadedFile ? uploadedFile.name : "Select a file"}
                        </p>

                        {uploadedFile && (
                          <div className="">
                            <Trash2
                              color="red"
                              size={20}
                              className="cursor-pointer"
                              onClick={() => setUploadedFile(null)}
                            />
                          </div>
                        )}
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Country, State, City Selector */}
              <div className="grid w-full  items-center gap-1.5">
                <Label>Location</Label>
                <CountryStateCitySelector
                  control={control}
                  setValue={setValue}
                  register={register}
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
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
                              className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded bg-[#F5F5F5] md:py-5"
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
                </div>
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Enter Your Password"
                              {...field}
                              className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded bg-[#F5F5F5] md:py-5"
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
                </div>
              </div>

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
                    href={"/terms-conditions"}
                    className="text-primary-red font-medium"
                  >
                    Terms conditions
                  </Link>{" "}
                  &{" "}
                  <Link
                    href={"/terms-conditions"}
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
      <DonationTypeDialog
        open={openSelectDonationTypeModal}
        setOpen={setOpenSelectDonationTypeModal}
      />
    </>
  );
};

export default CharityShopSignUpForm;
