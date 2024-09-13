/* eslint-disable @typescript-eslint/no-explicit-any */
import { TLoginUser, TUser } from './user.interface';
import { User } from './user.model';
import { AppError } from '../../errors/AppErrors';
import httpStatus from 'http-status';
import { createToken, verifyToken } from './user.utils';
import config from '../../config';

const createUserIntoDB = async (payload: TUser) => {
  const isStudentExists = await User.findOne({ email: payload.email });
  if (isStudentExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User already exists');
  }
  const result = await User.create(payload);
  return result;
};


const getAllUserFromDB = async () => {
  const result = await User.find(); 
  return result;
};
const findSingleUserIntoDB = async (email : string) => {
  const result = await User.findOne({ email }); 
  return result;
};


const loginUserIntoDB = async (paylod: TLoginUser) => {
  const userData = await User.isUserExistsByCustomeId(paylod.email);

  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
  }
  // =================================>>>>>  checking if the password is correct or not
  if (!(await User.isPasswordMatched(paylod?.password, userData?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'password is not matched');
  }

  const jwtPayload = {
    email: userData.email,
    role: userData.role,
  };
  // =========== jwt এর builting function
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorize!');
  }

  const decoded = verifyToken(token, config.jwt_refresh_secret as string);
  const { email } = decoded;

  // ========================================>>>>>>>>>> STATICKS method
  const userData = await User.isUserExistsByCustomeId(email);

  const jwtPayload = {
    email: userData.email,
    role: userData.role,
  };
  // =========== Auth.utils function
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  loginUserIntoDB,
  refreshToken,
  findSingleUserIntoDB
};
