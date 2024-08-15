import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductsServices } from './Products.service';

const getAllProducts = catchAsync(async (req, res) => {
  const result = await ProductsServices.getAllProducts();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Products Successfully',
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const { id, ...updateFields } = req.body;
  const result = await ProductsServices.updateProductIntoDB(id, updateFields);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product Update Successfully',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const result = await ProductsServices.deleteProductfromDB(
    req?.params.id as string,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product deleted Successfully',
    data: result,
  });
});

export const productsControllers = {
  getAllProducts,
  updateProduct,
  deleteProduct,
};
