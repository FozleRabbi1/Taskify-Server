import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProjectsServices } from './Projects.service';

const createProject = catchAsync(async (req, res) => {
  const result = await ProjectsServices.addProjectIntoDB(req?.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project Create Successfully',
    data: result,
  });
});

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

const updateSingleProjects = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;  
  const result = await ProjectsServices.updateMainProjectsSingleDataIntoDB(id,updateData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update your Projects',
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
  const deleteIdArray = req?.body?.idArray;
  const result = await ProjectsServices.deleteProjectsIntoDB(deleteIdArray );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'delete All Projects Successfully',
    data: result,
  });
});

const totalDataCount = catchAsync(async (req, res) => {
  const result = await ProjectsServices.totalDataCountIntoDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'count All data Successfully',
    data: result,
  });
});

export const projectsControllers = {
  createProject,
  getAllProjects,
  duplicateData,
  getAllFavourite,
  deleteProjects,
  updateSingleProjects,
  updateFavouriteProjects,
  updatesProjectsInfo,
  totalDataCount
};
