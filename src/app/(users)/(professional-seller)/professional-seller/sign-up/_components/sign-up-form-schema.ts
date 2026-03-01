import { z } from "zod";
export const formSchema = z
  .object({
    firstName: z
      .string({ required_error: "First Name is required" })
      .min(1, { message: "First Name is required" }),
    lastName: z
      .string({ required_error: "Last Name is required" })
      .min(1, { message: "Last Name is required" }),
    userName: z
      .string({ required_error: "Name is required" })
      .min(1, { message: "Name is required" }),
    businessEmail: z
      .string({ required_error: "Official Email is required" })
      .min(1, { message: "Official Email is required" })
      .email({ message: "Please enter a valid email address" }),
    phoneNumber: z
      .string({ required_error: "Phone Number is required" })
      .min(1, { message: "Phone Number is required" }),
    businessTags: z
      .array(z.string())
      .min(1, { message: "At least one business tag is required" }),
    socialMedia: z.object({
      facebook: z.string().optional(),
      x: z.string().optional(),
      tiktok: z.string().optional(),
      instagram: z.string().optional(),
      website: z.string().optional(),
    }),

    mission: z
      .string({ required_error: "Mission is required" })
      .min(1, { message: "Mission is required" }),
    uploadDocument: z.any().optional(),
    country: z
      .string({ required_error: "Country is required" })
      .min(1, "Please select a country"),
    streetAddress: z
      .string({ required_error: "Street address is required" })
      .min(1, "Street address is required"),
    city: z.string().optional(),
    state: z
      .string({ required_error: "State is required" })
      .min(1, "Please select a state"),
    zipCode: z
      .string({ required_error: "Zip code is required" })
      .min(1, "Zip code is required"),
    password: z
      .string({ required_error: "Password is required" })
      .min(1, { message: "Password is required" })
      .min(8, { message: "Passwords must be at least 8 characters long" })
      .max(64, { message: "Passwords must be at most 64 characters long" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
        },
      ),
    confirmPassword: z
      .string({ required_error: "Confirm Password is required" })
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
