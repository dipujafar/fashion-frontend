import { z } from "zod";
import { formSchema } from "./sign-up-form-schema";

export const formattedData = (data: z.infer<typeof formSchema>) => {
  return {
    phone: data.phoneNumber,
    password: data.password,
    fname: data.firstName,
    lname: data.lastName,
    userName: data.userName,
    email: data.businessEmail,
    role: "CHARITABLE_ORGANIZATION",
    business_tags: data.businessTags,
    website: data.socialMedia?.website ?? "",
    facebook: data.socialMedia?.facebook ?? "",
    instagram: data.socialMedia?.instagram ?? "",
    twitter: data.socialMedia?.x ?? "",
    tiktok: data.socialMedia?.tiktok ?? "",
    mission: data.mission,
    description: data.mission, // or map from another field if you add one
    country: data?.country,
    state: data?.state,
    city: data?.city,
    address: data.streetAddress,
    zip_code: data.zipCode,
  };
};
