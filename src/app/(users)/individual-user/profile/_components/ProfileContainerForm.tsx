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
import { useState } from "react";
import CommonButton from "@/components/ui/common-button";

import { Label } from "@/components/ui/label";

import { ImageUp, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import CustomAvatar from "@/components/shared/CustomAvatar";
import CountryStateCitySelector from "@/components/ui/country-state-city-selector";
import facebook from "@/assets/icons/facebook.png";
import instagram from "@/assets/icons/instagram.png";
import linkedin from "@/assets/icons/linkedin.png";
import XIcon from "@/assets/icons/x-icon.png";
import { PhoneInput } from "@/components/ui/PhoneInput";

const formSchema = z.object({
  firstName: z
    .string({ required_error: "First Name is required" })
    .min(1, { message: "First Name is required" }),
  lastName: z
    .string({ required_error: "Last Name is required" })
    .min(1, { message: "Last Name is required" }),
  image: z.string().optional(), // avatar image
  coverImage: z.string().optional(), // cover image added here
  userName: z
    .string({ required_error: "User Name is required" })
    .min(1, { message: "User Name is required" }),
  phoneNumber: z
    .string({ required_error: "Phone Number is required" })
    .min(1, { message: "Phone Number is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  storeName: z.string().optional(),
  about: z.string().optional(),
  country: z.string({
    required_error: "Please select a country.",
  }),
  streetAddress: z.string().min(5, {
    message: "Street address must be at least 5 characters.",
  }),
  city: z.string({
    required_error: "Please select a city.",
  }),
  state: z.string({
    required_error: "Please select a state.",
  }),
  zipCode: z.string().min(5, {
    message: "Zip code must be at least 5 characters.",
  }),
  socialMedia: z.array(
    z.object({
      instagram: z.string().optional(),
      facebook: z.string().optional(),
      x: z.string().optional(),
      tiktok: z.string().optional(),
    })
  ),
});

const ProfileContainerForm = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    null
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "Ziaul Haque",
      lastName: "Shapona",
      userName: "Prince Shapona",
      email: "shapona@me.com",
      phoneNumber: "+8801712345678",
      streetAddress: "Banasree",
      zipCode: "5444",
      country: "Bangladesh",
      city: "Dhaka",
      state: "Dhaka Division",
      storeName: "Fish Store",
      about: "I am a fish seller",
    },
  });
  const { register, setValue, control } = form;

  const handleImageChange = (files: any) => {
    if (files && files?.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  };

  const handleCoverImageChange = (files: any) => {
    if (files && files?.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setCoverImagePreview(url);
    } else {
      setCoverImagePreview(null);
    }
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <div className="lg:space-y-12 space-y-7 ">
      <Card className="  shadow-none border-none py-0">
        <CardContent className="px-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="md:space-y-6 space-y-4 w-full"
            >
              <div className="relative">
                {/* Cover Image upload */}
                <FormField
                  control={form.control}
                  name="coverImage"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative w-full h-40 md:h-60 xl:h-64 rounded-lg overflow-hidden mb-6">
                        <Image
                          src={coverImagePreview || "/user_cover_image.png"}
                          alt="Cover Preview"
                          fill
                          className="object-contain w-full h-full "
                        />

                        <Input
                          id="coverImageInput"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            field.onChange(e.target.files);
                            handleCoverImageChange(e.target.files);
                          }}
                        />
                        <label
                          htmlFor="coverImageInput"
                          className={cn(
                            "absolute bottom-4 right-4 bg-black/60 text-white size-8 rounded-full cursor-pointer hover:bg-slate-500 flex justify-center items-center"
                          )}
                        >
                          <ImageUp size={20} />
                        </label>

                        {coverImagePreview && (
                          <button
                            type="button"
                            onClick={() => {
                              setCoverImagePreview(null);
                              field.onChange(null);
                            }}
                            className="absolute top-4 right-4 bg-red-500 text-white p-1 rounded-full cursor-pointer"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Avatar upload */}
                <div className="absolute left-1/2 transform -translate-x-1/2 md:-bottom-16 -bottom-24">
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative size-44 mx-auto">
                          <CustomAvatar
                            className="md:size-40 size-28 object-cover mx-auto"
                            img={imagePreview || "/profile_placeholder.png"}
                            name="Ali Asraf"
                            fallbackClass="lg:text-4xl"
                          />

                          <input
                            id="avatarInput"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              field.onChange(e.target.files);
                              handleImageChange(e.target.files);
                            }}
                          />
                          <label
                            htmlFor="avatarInput"
                            className={cn(
                              "absolute md:bottom-8 bottom-16  md:right-4 right-10 bg-black/60 text-white md:size-[29px] size-6 flex-center rounded-full cursor-pointer hover:bg-slate-500",
                              imagePreview && "hidden"
                            )}
                          >
                            <ImageUp className="md:size-5 size-4" />
                          </label>
                          {imagePreview && (
                            <button
                              type="button"
                              onClick={() => {
                                setImagePreview(null);
                                field.onChange(null);
                              }}
                              className="absolute top-2 right-5 bg-red-500 text-white p-1 rounded-full"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="md:space-y-6 space-y-4 md:mt-20 mt-14 ">
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
                              placeholder="Enter Your First Name"
                              {...field}
                              className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded  md:py-5 bg-[#F5F5F5]"
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
                              className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded  md:py-5 bg-[#F5F5F5] "
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
                          className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded  md:py-5 bg-[#F5F5F5] "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex md:flex-row flex-col  gap-4">
                  <div className="flex-1">
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
                              className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded  md:py-5 bg-[#F5F5F5]"
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
                  <label className="text-sm font-medium ">
                    Social Media Link (Optional)
                  </label>
                  <div className="grid sm:grid-cols-2  gap-4 mt-2">
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
                      <Image
                        src={XIcon}
                        alt="logo"
                        className="w-[40px] h-[40px]"
                      />
                      <Input
                        {...form.register(`socialMedia.${0}.x`)}
                        type="text"
                        placeholder="Enter Your X Link"
                        className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded bg-[#F5F5F5] md:py-5"
                      />
                    </div>
                    <div className="flex items-center gap-x-2">
                      <Image
                        src={linkedin}
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

                {/* Country, State, City Selector */}
                <div className="grid w-full items-center gap-1.5">
                  <Label>Location</Label>
                  <CountryStateCitySelector
                    control={control}
                    setValue={setValue}
                    register={register}
                    userAddress={{
                      country: form.getValues("country"),
                      state: form.getValues("state"),
                      city: form.getValues("city"),
                    }}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="about"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter some description..."
                          {...field}
                          className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded  min-h-[90px] bg-[#F5F5F5]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <CommonButton className="w-full">Save</CommonButton>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileContainerForm;
