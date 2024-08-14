import { model, Schema } from 'mongoose';
import { IProduct } from './Products.interface';

const ProductSchema: Schema = new Schema<IProduct>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  stockQuantity: { type: Number, required: true },
  brand: { type: String, required: true },
  rating: { type: Number },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

export const Product = model<IProduct>('Product', ProductSchema);
