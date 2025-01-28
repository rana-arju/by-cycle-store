import { z } from "zod";

export const productSchema = z.object({
  name: z.string({
    required_error: "Name is required!",
  }),
  model: z.string({
    required_error: "Model is required!",
  }),
  category: z.string({
    required_error: "Category is required!",
  }),
  brand: z
    .string({ required_error: "Brand is required" })
    .min(3, { message: "Must have at least 3 character" }),
  description: z
    .string({ required_error: "Description is required" })
    .min(20, { message: "Must have at least 20 character" }),
  quantity: z.string({ required_error: "Quantity is required" }),
  price: z.string({ required_error: "Quantity is required" }),
  images: z.string({
    required_error: "Provide at least one product image",
  }),
});
