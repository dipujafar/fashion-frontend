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

    bio: z
        .string()
        .trim()
        .optional(),

    description: z
        .string()
        .trim()
        .optional(),

    country: z.string({ required_error: "Country is required" }).min(1, "Please select a country"),
    streetAddress: z.string().optional(),
    city: z.string({ required_error: "City is required" }).min(1, "Please select a city"),
    state: z.string({ required_error: "State is required" }).min(1, "Please select a state"),
    zipCode: z.string().optional(),

    website: z.string().url({ message: "Please enter a valid URL" }).optional(),
    vacationMode: z.boolean().optional(),
});




export default profileSchema;