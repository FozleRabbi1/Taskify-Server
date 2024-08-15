import { IProduct } from './Products.interface';
import { Product } from './Products.module';

const createProductIntoDB = async (payload: IProduct) => {
  const result = await Product.create(payload);
  return result;
};

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

const deleteProductfromDB = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

export const ProductsServices = {
  createProductIntoDB,
  getAllProducts,
  updateProductIntoDB,
  deleteProductfromDB,
};
