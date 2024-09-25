import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import config from '../../config';

const getSingleUser = catchAsync(async (req, res) => {
  const email = req.params.email;  
  const result = await UserServices.findSingleUserIntoDB(email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get single User successFully',
    data: result,
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUserFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Users successFully',
    data: result,
  });
});

const createUser = catchAsync(async (req, res) => {
  const { user: userData } = req.body;  
  const result = await UserServices.createUserIntoDB(userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Registered successFully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await UserServices.loginUserIntoDB(req.body);
  const { refreshToken, accessToken } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is loged in successfully',
    data: {
      accessToken,
    },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await UserServices.refreshToken(refreshToken);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access is token retrived successfully',
    data: result,
  });
});


const deleteUser = catchAsync(async (req, res) => {
  const deleteIdArray = req?.body?.idArray;
  const result = await UserServices.deleteUserIntoDB(deleteIdArray );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'delete User Successfully',
    data: result,
  });
});


export const userController = {
  getSingleUser,
  getAllUser,
  createUser,
  loginUser,
  refreshToken,
  deleteUser
};
