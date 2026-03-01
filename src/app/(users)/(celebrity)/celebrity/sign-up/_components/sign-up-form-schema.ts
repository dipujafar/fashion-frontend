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
      .string({ required_error: "User Name is required" })
      .min(1, { message: "User Name is required" }),
    phoneNumber: z
      .string({ required_error: "Phone Number is required" })
      .min(1, { message: "Phone Number is required" }),
    description: z.string().min(1, "Description is required"),
    email: z
      .string({ required_error: "Email is required" })
      .min(1, { message: "Email is required" })
      .email({ message: "Please enter a valid email address" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(1, { message: "Password is required" })
      .min(8, { message: "passwords must be at least 8 characters long" })
      .max(64, { message: "passwords must be at most 64 characters long" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
        },
      ),
    confirmPassword: z
      .string({ required_error: "Confirm Password is required" })
      .min(1, { message: "Confirm Password is required" }),
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

    socialMedia: z.array(
      z.object({
        instagram: z.string().optional(),
        facebook: z.string().optional(),
        x: z.string().optional(),
        tiktok: z.string().optional(),
      }),
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
