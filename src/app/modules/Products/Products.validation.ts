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

export const ProductValidationSchema = {
  ProductSchema,
};
