/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

// ======================================>>>>>>>> Register Interface
export type TUserName = {
  firstName: string;
  lastName: string;
};

export interface TUser {
  id: string;
  Id : number;
  email: string;
  password: string;
  name: TUserName;
  role: 'user' | 'Admin' | "client" | "member" | "product manager" | 'developer';
  image:string;
  projects ?: number;
  tasks ?: number
}

// ======================================>>>>>>>> Login Interface
export type TLoginUser = {
  email: string;
  password: string;
};

export interface UserModel extends Model<TUser> {
  isUserExistsByCustomeId(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashPassword: string,
  ): Promise<boolean>;
}
