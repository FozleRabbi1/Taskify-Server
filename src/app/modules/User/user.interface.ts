/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { User_Role } from './user.constent';

export type TUserName = {
  firstName: string;
  lastName: string;
};

export interface TUser {
  id: string;
  email: string;
  password: string;
  name: TUserName;
}

export interface UserModel extends Model<TUser> {
  isUserExistsByCustomeId(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof User_Role;
