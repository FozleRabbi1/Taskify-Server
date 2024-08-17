/* eslint-disable @typescript-eslint/no-explicit-any */
import { TLoginUser, TUser } from './user.interface';
import { User } from './user.model';
import { AppError } from '../../errors/AppErrors';
import httpStatus from 'http-status';
import { createToken } from './user.utils';
import config from '../../config';

const createUserIntoDB = async (payload: TUser) => {
  const isStudentExists = await User.findOne({ email: payload.email });
  if (isStudentExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User already exists');
  }
  const result = await User.create(payload);
  return result;
};

const loginUserService = async (paylod: TLoginUser) => {
  const userData = await User.isUserExistsByCustomeId(paylod.email);

  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
  }
  // =================================>>>>>  checking if the password is correct or not
  if (!(await User.isPasswordMatched(paylod?.password, userData?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'password is not matched');
  }

  const jwtPayload = {
    userId: userData.id,
    role: userData.email,
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

export const UserServices = {
  createUserIntoDB,
  loginUserService,
};
