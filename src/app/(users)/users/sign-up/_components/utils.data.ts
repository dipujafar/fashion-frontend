import formSchema from "./SignSchema";
import { z } from "zod";

export const formattedData = (data: z.infer<typeof formSchema>) => {
  return {
    phone: data.phoneNumber,
    password: data.password,
    fname: data.firstName,
    lname: data.lastName,
    email: data.email,
    role: "INDIVIDUAL_USER",
    facebook: data.socialMedia[0]?.facebook || "",
    instagram: data.socialMedia[0]?.instagram || "",
    twitter: data.socialMedia[0]?.x || "",
    tiktok: data.socialMedia[0]?.tiktok || "",
    country: data?.country,
    state: data?.state,
    city: data?.city,
    address: data.streetAddress,
    zip_code: data.zipCode,
  };
};
