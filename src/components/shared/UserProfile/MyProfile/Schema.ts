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

    userName: z
        .string()
        .trim()
        .optional(),

    email: z
        .string()
        .trim()
        .optional(),

    website: z
        .string()
        .url({ message: "Please enter a valid URL" })
        .optional()
        .or(z.literal("")),
});




export default profileSchema;