import { z } from 'zod';

const ProductSchema = z.object({
  body: z.object({
    name: z.string(),
    category: z.string(),
    stockQuantity: z.number(),
    brand: z.string(),
    rating: z.number().min(0).max(5),
    description: z.string(),
    price: z.number(),
    image: z.string().url(),
  }),
});

const UpdateProductSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    category: z.string().optional(),
    stockQuantity: z.number().optional(),
    brand: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    image: z.string().url().optional(),
  }),
});

export const ProductValidationSchema = {
  ProductSchema,
  UpdateProductSchema,
};
