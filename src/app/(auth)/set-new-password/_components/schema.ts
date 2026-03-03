import { z } from "zod";
export const formSchema = z
  .object({
    password: z
      .string({ required_error: "Password is required" })
      .min(1, { message: "Password is required" })
      .min(8, { message: " passwords must be at least 8 characters long" })
      .max(64, { message: " passwords must be at most 64 characters long" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
        },
      ),
    confirmPassword: z
      .string({ required_error: "Password is required" })
      .min(1, { message: "Password is required" })
      .min(8, { message: " passwords must be at least 8 characters long" })
      .max(64, { message: " passwords must be at most 64 characters long" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
        },
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
