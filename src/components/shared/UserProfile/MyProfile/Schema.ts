import { z } from "zod";
const profileSchema = z.object({
  firstName: z
    .string({ required_error: "First Name is required" })
    .min(1, { message: "First Name is required" }),
  lastName: z
    .string()
    .trim()
    .optional(),

  phoneNumber: z
    .string({ required_error: "Phone Number is required" })
    .min(1, { message: "Phone Number is required" }),

  country: z.string({ required_error: "Country is required" }).min(1, "Please select a country"),
  streetAddress: z.string({ required_error: "Street address is required" }).min(1, "Street address is required"),
  city: z.string().optional(),
  state: z.string({ required_error: "State is required" }),
  zipCode: z.string({ required_error: "Zip code is required" }).min(1, "Zip code is required"),

  website: z.string().url({ message: "Please enter a valid URL" }).optional(),
  vacationMode: z.boolean().optional(),
});




export default profileSchema;