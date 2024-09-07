// import { IProduct } from './Products.interface';
// import { Product } from './Products.module';

import { Project } from "./Projects.module";

// const createProductIntoDB = async (payload: IProduct) => {
//   const result = await Product.create(payload);
//   return result;
// };

const getAllProjects = async () => {
  const result = await Project.find();
  return result;
};

// const updateProductIntoDB = async (id: string, payload: Partial<IProduct>) => {
//   const result = await Product.findByIdAndUpdate(
//     id,
//     { $set: payload },
//     { new: true, runValidators: true },
//   );
//   return result;
// };

// const deleteProductfromDB = async (id: string) => {
//   const result = await Product.findByIdAndDelete(id);
//   return result;
// };

export const ProjectsServices = {
  getAllProjects,
  // createProductIntoDB,
  // updateProductIntoDB,
  // deleteProductfromDB,
};
