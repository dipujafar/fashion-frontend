import { z } from "zod";
const formSchema = z.object({
  fname: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name is required" }),

  userName: z
    .string({ required_error: "User Name is required" })
    .min(1, { message: "User Name is required" }),
  
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
      }
    ),
  
})




export default formSchema;