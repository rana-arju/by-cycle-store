import { z } from "zod";

export const checkout = z.object({
  name: z.string({
    required_error: "Name is required!",
  }),
  email: z.string({
    required_error: "email is required!",
  }),
  city: z.string({
    required_error: "city is required!",
  }),
  address: z
    .string({ required_error: "Address is required" })
    .min(3, { message: "Must have at least 3 character" }),
  phone: z
    .string({ required_error: "Phone is required" })
    .min(11, { message: "Must have at least 11 character" }),
  
});
