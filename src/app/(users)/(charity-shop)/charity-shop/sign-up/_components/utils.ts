import { z } from "zod";
import { formSchema } from "./sign-up-form-schema";

type FormData = z.infer<typeof formSchema>;

export const formatFormData = (data: FormData) => {
  return {
    phone: data.phoneNumber,
    password: data.password,
    fname: data.firstName,
    lname: data.lastName,
    userName: data.userName,
    email: data.businessEmail,
    role: "CHARITY_SHOP",
    business_tags: data.businessTags,
    facebook: data.socialMedia?.facebook ?? "",
    instagram: data.socialMedia?.instagram ?? "",
    twitter: data.socialMedia?.x ?? "",
    tiktok: data.socialMedia?.tiktok ?? "",
    mission: data.mission,
    country: data?.country,
    state: data?.state,
    city: data?.city ?? "",
    address: data?.streetAddress,
    zip_code: data?.zipCode,
  };
};