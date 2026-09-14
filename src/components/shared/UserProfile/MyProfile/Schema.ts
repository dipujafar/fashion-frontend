import { z } from "zod";
const profileUpdateSchema = z.object({
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
        .email({ message: "Please enter a valid email address" })
        .optional(),

    support_email: z
        .string()
        .trim()
        .email({ message: "Please enter a valid email address" })
        .optional()
        .or(z.literal("")),

    website: z
        .string()
        .url({ message: "Please enter a valid URL" })
        .optional()
        .or(z.literal("")),

    facebook: z
        .string()
        .url({ message: "Please enter a valid URL" })
        .optional()
        .or(z.literal("")),

    instagram: z
        .string()
        .url({ message: "Please enter a valid URL" })
        .optional()
        .or(z.literal("")),

    twitter: z
        .string()
        .url({ message: "Please enter a valid URL" })
        .optional()
        .or(z.literal("")),

});


export const charitySchema = z.object({
    description: z
        .string({ required_error: "Write some details about your charity" })
        .min(1, { message: "Write some details about your charity" }),
})

export default profileUpdateSchema;