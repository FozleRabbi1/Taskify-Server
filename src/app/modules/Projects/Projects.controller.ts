import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProjectsServices } from './Projects.service';



const getAllProjects = catchAsync(async (req, res) => {
  const result = await ProjectsServices.getAllProjects(req?.query);
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

const updateStatusProjects = catchAsync(async (req, res) => {
  const id = req.params.id;
  const status = req.body.selectedStatus;  
  const result = await ProjectsServices.updateStatusProjectIntoDB(id,status);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update your status successfully',
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



export const projectsControllers = {
  getAllProjects,
  deleteProjects,
  updateFavouriteProjects,
  updateStatusProjects
  
};
