import  { model, Schema } from 'mongoose';
import { TProduct } from './Projects.interface';

const productSchema  = new Schema<TProduct>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  recipe: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['salad', 'drinks', 'popular', 'dessert', 'pizza', 'soup', 'offered'],
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
});

export const Product = model<TProduct>('Product', productSchema);

export default Product;
