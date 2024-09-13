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


const duplicateData = catchAsync(async (req, res) => {
  const id = req.params.id
  const title = req.body.title
  const result = await ProjectsServices.duplicateDataIntoDB(id, title);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Duplicate Projects Successfully',
    data: result,
  });
});


const getAllFavourite = catchAsync(async (req, res) => {
  const result = await ProjectsServices.getAllFavouriteProjects();
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

const updatesProjectsInfo = catchAsync(async (req, res) => {
  const id = req.params.id;
  const keyName = req.body.keyName;  
  const status = req.body.selectedStatus;
  
  const result = await ProjectsServices.updateProjectIntoDB(id,keyName,status);
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
  duplicateData,
  getAllFavourite,
  deleteProjects,
  updateFavouriteProjects,
  updatesProjectsInfo  
};
