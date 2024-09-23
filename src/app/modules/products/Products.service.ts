import Product from "./Projects.module";

const getAllProductsFromDB = async () => {
    const result = await Product.find();
    return result;
  };


  




  
  export const ProductServices = {
    getAllProductsFromDB,
  };
  