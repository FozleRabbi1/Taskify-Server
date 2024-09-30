/* eslint-disable @typescript-eslint/no-explicit-any */
import { TLoginUser, TUser } from './user.interface';
import { User } from './user.model';
import { AppError } from '../../errors/AppErrors';
import httpStatus from 'http-status';
import { createToken, verifyToken } from './user.utils';
import config from '../../config';
import mongoose from 'mongoose';
import { Project } from '../Projects/Projects.module';

const createUserIntoDB = async (payload: TUser) => {

  const isStudentExists = await User.findOne({ email: payload.email });
  if (isStudentExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User already exists');
  }

  const lastDocument = await User.findOne().sort({ _id: -1 }).exec();
  const lastDocumentId = lastDocument?.Id || 0;

  const newUserData = {
    Id: lastDocumentId + 1,
    email : payload.email,
    password : payload.password,
    name : payload.name,
    role : payload.role,
    image : payload.image,
    number : payload.number
  };

  const result = await User.create(newUserData);
  return result;
};

const getAllUserFromDB = async () => {
  const user = await User.find({ role: { $in: ["Admin", "user"] } });
  const client = await User.find({role : "client"});
  const allUsers = await User.find()
  return {user, client, allUsers};
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
  if(userData){
    await User.findOneAndUpdate({email : paylod.email}, {isActive : paylod.isActive}, {new : true, runValidators : true})
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

const logOut = async ({email} : { email : string})=>{  
  const result = await User.findOneAndUpdate({email}, {isActive : false}, {new : true, runValidators : true})
  return result  
}

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

const deleteUserIntoDB = async (payload: any) => {
  try {
    if (!Array.isArray(payload) || !payload.every(id => typeof id === 'string')) {
      throw new Error('Invalid payload format');
    }

    const objectIds = payload.map(id => new mongoose.Types.ObjectId(id));

    const matchingProjects = await Project.find({ usersId: { $in: objectIds } });

    const matchedUsers = await User.find({ _id: { $in: objectIds } }, { image: 1 });
    const userImages = matchedUsers.map(user => user.image);

    for (const project of matchingProjects) {
      const updatedUsersId = (project.usersId ?? []).filter(userId => {
        return !objectIds.map(objId => objId.toString()).includes(userId.toString());
      });

      const updatedUsers = (project.users ?? []).filter(userImage => {
        return !userImages.includes(userImage);
      });

      await Project.updateOne(
        { _id: project._id },
        {
          $set: {
            usersId: updatedUsersId, 
            users: updatedUsers  
          }
        }
      );
    }

    const assignedProjectCounts = await Promise.all(
      objectIds.map(async (userId) => {
        const count = await Project.countDocuments({
          usersId: { $in: [userId] },
        });
        return { userId, assignedProjectCount: count };
      })
    );
    await Promise.all(
      assignedProjectCounts.map(async (item) => {
        await User.findByIdAndUpdate(
          item.userId,
          { projects: item.assignedProjectCount },
          { new: true, runValidators: true }
        );
      })
    );

    const result = await User.deleteMany({ _id: { $in: objectIds } });
    return result;

  } catch (error) {
    console.error('Error updating projects:', error);
    throw error;
  }
};


export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  loginUserIntoDB,
  refreshToken,
  findSingleUserIntoDB,
  deleteUserIntoDB,
  logOut
};
