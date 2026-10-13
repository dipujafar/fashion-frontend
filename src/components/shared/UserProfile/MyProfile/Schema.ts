import { z } from "zod";

const optionalUrl = z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
        (value) =>
            !value ||
            z.string().url().safeParse(
                value.startsWith("www.") ? `https://${value}` : value
            ).success,
        { message: "Please enter a valid URL" }
    );

const profileUpdateSchema = z.object({
    firstName: z
        .string({ required_error: "First Name is required" })
        .min(1, { message: "First Name is required" }),
    lastName: z
        .string()
        .trim()
        .optional(),

    phoneNumber: z
        .string()
        .trim()
        .optional()
        .or(z.literal("")),

    country: z
        .string({ required_error: "Country is required" })
        .min(1, { message: "Country is required" }),

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

    website: optionalUrl,

    facebook: optionalUrl,

    instagram: optionalUrl,

    twitter: optionalUrl,

});


export const charitySchema = z.object({
    description: z
        .string({ required_error: "Write some details about your charity" })
        .min(1, { message: "Write some details about your charity" }),
})

export default profileUpdateSchema;