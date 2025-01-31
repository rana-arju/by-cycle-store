import { z } from "zod";
const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);
export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required!",
    })
    .email({ message: "Invalid email address" }),
  password: z.string({
    required_error: "Password is required",
  }),
});
export const passwordSchema = z.object({
  oldPassword: z
    .string({
      required_error: "Old password is required!",
    }),
  newPassword: z.string({
    required_error: "New password is required",
  }),
});

export const registrationSchema = z.object({
  name: z.string({
    required_error: "Name is required!",
  }),
  email: z
    .string({
      required_error: "Email is required!",
    })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Must have at least 8 character" })
    .regex(passwordValidation, {
      message: "Your password is not valid",
    }),
});
