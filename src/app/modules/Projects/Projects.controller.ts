import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProjectsServices } from './Projects.service';

// const createProduct = catchAsync(async (req, res) => {
//   const result = await ProductsServices.createProductIntoDB(req.body);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Product create Successfully',
//     data: result,
//   });
// });

const getAllProjects = catchAsync(async (req, res) => {
  const result = await ProjectsServices.getAllProjects();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Projects Successfully',
    data: result,
  });
});

const updateFavouriteProjects = catchAsync(async (req, res) => {
  const id = req.params.id;
  const isFavourite = req.body;
  
  const result = await ProjectsServices.updateFavouriteProjectIntoDB(id,isFavourite);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update your favourite data',
    data: result,
  });
});

const deleteProjects = catchAsync(async (req, res) => {
  const deleteIdArray = req.body.idArray;
  const result = await ProjectsServices.deleteProjectsIntoDB(deleteIdArray );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'delete All Projects Successfully',
    data: result,
  });
});




// const updateProduct = catchAsync(async (req, res) => {
//   const { id, ...updateFields } = req.body;
//   const result = await ProductsServices.updateProductIntoDB(id, updateFields);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Product Update Successfully',
//     data: result,
//   });
// });

// const deleteProduct = catchAsync(async (req, res) => {
//   const result = await ProductsServices.deleteProductfromDB(
//     req?.params.id as string,
//   );
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Product deleted Successfully',
//     data: result,
//   });
// });


export const projectsControllers = {
  getAllProjects,
  deleteProjects,
  updateFavouriteProjects
  // createProduct,
  // updateProduct,
  // deleteProduct,
};
