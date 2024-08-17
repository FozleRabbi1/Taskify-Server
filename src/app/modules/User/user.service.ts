/* eslint-disable @typescript-eslint/no-explicit-any */
import { TUser } from './user.interface';
import { User } from './user.model';
import { AppError } from '../../errors/AppErrors';
import httpStatus from 'http-status';

const createUserIntoDB = async (payload: TUser) => {
  const isStudentExists = await User.findOne({ email: payload.email });
  if (isStudentExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User already exists');
  }
  const result = await User.create(payload);
  // console.log(payload);
  return result;
};

export const UserServices = {
  createUserIntoDB,
};
