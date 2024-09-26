/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose from "mongoose";
import { Project } from "./Projects.module";
import { TProjuct } from "./Projects.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import { Todos } from "../Todos/Todos.module";
import { User } from "../User/user.model";



const addProjectIntoDB = async (payload: TProjuct) => {
  const lastDocument = await Project.findOne().sort({ _id: -1 }).exec();
  const lastDocumentId = lastDocument?.id || 0;

  const { startsAt, endsAt, usersId, clientsId, ...datas } = payload;

  // Validate usersId
  if (!usersId || usersId.length === 0) {
    throw new Error('No usersId provided or the usersId array is empty');
  }

  const usersData = await User.find({ _id: { $in: usersId } }).select('image');
  const usersImages = usersData.map(user => user.image);
  
  const clientsData = await User.find({ _id: { $in: clientsId } }).select('image');
  const clientsImages = clientsData.map(client => client.image);  

  const updateStartsAt = new Date(startsAt).toISOString();
  const updateEndsAt = new Date(endsAt).toISOString();

  const data = {
    id: lastDocumentId + 1,
    title: datas.title,
    budget: datas.budget,
    priority: datas.priority,
    status: datas.status,
    tags: datas.tags,
    users: usersImages,
    usersId,
    clientsId,
    clients: clientsImages,
    startsAt: updateStartsAt,
    endsAt: updateEndsAt,
  };

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await Project.create([data], { session });

    const assignedProjectCounts = await Promise.all(
      usersId.map(async (userId) => {
        const count = await Project.countDocuments({
          usersId: { $in: [userId] },
        }).session(session);
        return { userId, assignedProjectCount: count };
      })
    );

    await Promise.all(
      assignedProjectCounts.map(async (item) => {
        await User.findByIdAndUpdate(
          item.userId,
          { projects: item.assignedProjectCount },
          { new: true, runValidators: true, session }
        );
      })
    );

    await session.commitTransaction();
    return result;
  } catch (err: any) {
    await session.abortTransaction();
    throw new Error(err);
  } finally {
    await session.endSession();
  }
};


const totalDataCountIntoDB = async () => {
  const [onGoing, completed, started, inReview, defaultStatus, checkedTrue, checkedFalse] = await Promise.all([
    Project.find({ status: "On Going" }).countDocuments(),
    Project.find({ status: "Completed" }).countDocuments(),
    Project.find({ status: "Started" }).countDocuments(),
    Project.find({ status: "In Review" }).countDocuments(),
    Project.find({ status: "Default" }).countDocuments(),
    Todos.find({ checked: "true" }).countDocuments(),
    Todos.find({ checked: "false" }).countDocuments(),
  ]);

  const projectData = {
    OnGoing: onGoing,
    Completed: completed,
    Started: started,
    InReview: inReview,
    Default: defaultStatus,
  };

  const allTasksData = {
    OnGoing: onGoing + 2,
    Completed: completed + 3,
    Started: started + 1,
    InReview: inReview + 2,
    Default: defaultStatus + 6,
  };

  const todoData = {
    CheckedTrue: checkedTrue,
    CheckedFalse: checkedFalse,
  };
  
  return { projectData, todoData, allTasksData };
};

const getAllProjects = async (query: Record<string, unknown>) => {
  if (query?.date && query?.fieldName) {
    const [startDateString, endDateString] = (query.date as string).split(',');

    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);
    const fieldName = query.fieldName as string;
    const pipeline = [
      {
        $match: {
          [fieldName]: {
            $gte: startDate, 
            $lte: endDate, 
          },
        },
      },
    ];

    const result = await Project.aggregate(pipeline).exec();
    return result.reverse();
  }

  const projectsQuery = new QueryBuilder(
    Project.find(), query,
  )
    .search(["title"])
    .filter();
  
  const result = await projectsQuery.modelQuery;
  return result.reverse();
};

const duplicateDataIntoDB = async (mainId: string, title: string) => {
  try {
    const lastDocument = await Project.findOne().sort({ _id: -1 }).exec();
    const lastDocumentId = lastDocument?.id || 0;

    const project = await Project.findById(mainId);
    if (!project) {
      throw new Error('Project not found');
    }

    const usersData = await User.find({ _id: { $in: project?.usersId } }).select('projects');
    
    await Promise.all(
      usersData.map(async (user) => {
        const updatedProjectCount = (user.projects || 0) + 1; 
        await User.findByIdAndUpdate(user._id, { projects: updatedProjectCount }, { new: true });
      })
    );

    const newProjectData = project.toObject() as Partial<typeof Project> & { _id?: mongoose.Types.ObjectId };
    delete newProjectData._id;

    const startsAt = new Date();
    const endsAt = new Date(startsAt);
    endsAt.setDate(startsAt.getDate() + 5);

    const formatDate = (date: Date) => date.toISOString();

    const newProject = new Project({
      ...newProjectData,
      title,
      id: lastDocumentId + 1,
      startsAt: formatDate(startsAt),
      endsAt: formatDate(endsAt)
    });

    await newProject.save();
    return newProject;
  } catch (error) {
    console.error('Error duplicating project:', error);
    throw error;
  }
};

const getAllFavouriteProjects = async () => {  
  const result = await Project.find({isFavourite : "true"});
  return result;
};

const updateFavouriteProjectIntoDB = async (id: string, payload: Partial<TProjuct>) => {
  try {
    const updateData = { ...payload };   

    if (payload.isFavourite === "favourite") {
      delete updateData.isFavourite;
      await Project.updateOne(
        { _id: id },
        { $unset: { isFavourite: "" } }
      );
    } else {
      await Project.updateOne(
        { _id: id },
        { $set: { isFavourite: true } }
      );
    }
  } catch (error) {
    console.error("Error updating project:", error);
  }
};


// =========================================================================== Loading related work for favourite 
// const updateFavouriteProjectIntoDB = async (id: string, payload: Partial<TProjuct>) => {
//   try {
//     const updateData = { ...payload };   

//     if (payload.isFavourite === "favourite") {
//       // Unsetting isFavourite field
//       delete updateData.isFavourite;
//       await Project.updateOne(
//         { _id: id },
//         { $unset: { isFavourite: "" } }
//       );
//     } else {
//       // Setting isFavourite to true
//       await Project.updateOne(
//         { _id: id },
//         { $set: { isFavourite: true } }
//       );
//     }

//     // Call getAllFavouriteProjects after the update
//     const favouriteProjects = await getAllFavouriteProjects();

//     // Optionally, you can return the updated favourites to the frontend
//     return favouriteProjects;

//   } catch (error) {
//     console.error("Error updating project:", error);
//   }
// };
// // Function to get all favourite projects
// const getAllFavouriteProjects = async () => {   
//   const result = await Project.find({ isFavourite: true });
//   return result;
// };




const updateMainProjectsSingleDataIntoDB = async (id: string, payload: Partial<TProjuct>) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const userIds = payload?.users;
    const originalProject = await Project.findById(id).select('usersId').session(session);    
    if (!originalProject) throw new Error('Project not found');
    const originalUserIds = originalProject.usersId || [];
    if (Array.isArray(userIds)) {
      const usersData = await User.find({ _id: { $in: userIds } }).select('image');
      const usersImages = usersData.map(user => user.image);
      payload.users = usersImages as string[];
      payload.usersId = userIds;
      const removedUserIds = originalUserIds.filter(userId => !userIds.includes(userId.toString()));

      await Project.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
        session,
      });

      const allUserIds = [...new Set([...userIds, ...removedUserIds])];
      const assignedProjectCounts = await Promise.all(
        allUserIds.map(async (userId) => {
          const count = await Project.countDocuments({
            usersId: { $in: [userId] }
          }).session(session);
          return { userId, assignedProjectCount: count };
        })
      );

      const bulkOps = assignedProjectCounts.map(item => ({
        updateOne: {
          filter: { _id: item.userId },
          update: { projects: item.assignedProjectCount },
          upsert: false
        }
      }));
      await User.bulkWrite(bulkOps, { session });
    } else {
      await Project.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
        session,
      });
    }

    await session.commitTransaction();
    return await Project.findById(id).session(session); 

  } catch (error) {
    await session.abortTransaction();
    console.error('Error updating project with user data:', error);
    throw new Error('Error updating project with user data');
  } finally {
    await session.endSession();
  }
};


const updateProjectIntoDB = async (id: string, keyName : string , payload: Partial<TProjuct>) => {  
  const update = { [keyName]: payload };
  const updatedProject = await Project.findByIdAndUpdate(id, update, {
    new: true, 
    runValidators: true,
  });
  return updatedProject
};


const deleteProjectsIntoDB = async (payload: any) => {
  try {
    if (!Array.isArray(payload) || !payload.every(id => typeof id === 'string')) {
      throw new Error('Invalid payload format');
    }
    const objectIds = payload.map(id => new mongoose.Types.ObjectId(id));
    const datas = await Project.find({ _id: objectIds }).select('usersId');
    const userIdCountMap: Record<string, number> = {};

    datas.forEach(data => {
      data?.usersId?.forEach(userId => {
        userIdCountMap[userId] = (userIdCountMap[userId] || 0) + 1;
      });
    });
    await Promise.all(
      Object.entries(userIdCountMap).map(async ([userId, count]) => {
        const user = await User.findById(userId).select('projects');
        
        if (user) {
          const updatedProjectsCount = Math.max((user.projects || 0) - count, 0);
          await User.findByIdAndUpdate(userId, { projects: updatedProjectsCount }, { new: true, runValidators: true });
        } else {
          console.warn(`User with ID ${userId} not found.`);
        }
      })
    );
    const result = await Project.deleteMany({ _id: { $in: objectIds } });
    return result;
  } catch (error) {
    console.error('Error updating users:', error);
    throw error;
  }
};



export const ProjectsServices = {
  addProjectIntoDB,
  totalDataCountIntoDB,
  getAllProjects,
  duplicateDataIntoDB,
  deleteProjectsIntoDB,
  getAllFavouriteProjects,
  updateMainProjectsSingleDataIntoDB,
  updateFavouriteProjectIntoDB,
  updateProjectIntoDB,
};
