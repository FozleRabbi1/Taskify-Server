import { IProduct } from './Products.interface';
import { Product } from './Products.module';

const getAllProducts = async () => {
  const result = await Product.find();
  return result.reverse();
};

const updateProductIntoDB = async (id: string, payload: Partial<IProduct>) => {
  const result = await Product.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true, runValidators: true },
  );
  return result;
};

export const ProductsServices = {
  getAllProducts,
  updateProductIntoDB,
};
