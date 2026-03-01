import { z } from "zod";
import { formSchema } from "./sign-up-form-schema";

export const formattedData = (data: z.infer<typeof formSchema>) => {
  const social = data.socialMedia?.[0] || {};
  return {
    fname: data.firstName,
    lname: data.lastName,
    username: data.userName,
    phone: data.phoneNumber,
    email: data.email,
    password: data.password,
    description: data.description,
    role: "AMBASSADOR",
    country: data.country,
    state: data.state,
    city: data.city,
    address: data.streetAddress,
    zip_code: data.zipCode,
    instagram: social.instagram ?? "",
    facebook: social.facebook ?? "",
    twitter: social.x ?? "",
    tiktok: social.tiktok ?? "",
  };
};
