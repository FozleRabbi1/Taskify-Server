/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose from "mongoose";
import { Project } from "./Projects.module";
import { TProjuct } from "./Projects.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import { Todos } from "../Todos/Todos.module";
import { User } from "../User/user.model";


// const addProjectIntoDB = async (payload : TProjuct) =>{
//   const lastDocument = await Project.findOne().sort({ _id: -1 }).exec();
//     const lastDocumentId = lastDocument?.id || 0;
//     const {startsAt, endsAt, ...datas } = payload
//     const updateStartsAt = new Date(startsAt).toISOString();
//     const updateEndsAt = new Date(endsAt).toISOString();
//     const userCollection = await User.find()
//     const data = {
//       ...datas,
//       id : lastDocumentId + 1,
//       startsAt : updateStartsAt,
//       endsAt : updateEndsAt
//     }
//   // const result = await Project.create(data)
//   console.log(data);
//   return null  
// }



// ===============================================================================================================================
// const addProjectIntoDB = async (payload: TProjuct) => {

//   // const userId  = await User.find().select("_id")
//   // console.log(userId);
  

//   const lastDocument = await Project.findOne().sort({ _id: -1 }).exec();
//   const lastDocumentId = lastDocument?.id || 0;
//   const { startsAt, endsAt, usersId, clientsId, ...datas } = payload;

  
//   const usersData = await User.find({ _id: { $in: usersId } }).select('image');
//   const usersImages = usersData.map(user => user.image);
//   const clientsData = await User.find({ _id: { $in: clientsId } }).select('image');
//   const clientsImages = clientsData.map(client => client.image);



//   const updateStartsAt = new Date(startsAt).toISOString();
//   const updateEndsAt = new Date(endsAt).toISOString();

//   const data = {
//     id: lastDocumentId + 1,
//     title: datas.title,
//     budget: datas.budget,
//     priority: datas.priority,
//     status: datas.status,
//     tags: datas.tags,
//     users: usersImages,
//     usersId,
//     clientsId,
//     clients: clientsImages,
//     startsAt: updateStartsAt,
//     endsAt: updateEndsAt
//   };

//   const result = await Project.create(data);
//   return result; 
// };

// ===================================================================================================================

// const addProjectIntoDB = async (payload: TProjuct) => {
//   const lastDocument = await Project.findOne().sort({ _id: -1 }).exec();
//   const lastDocumentId = lastDocument?.id || 0;
//   const { startsAt, endsAt, usersId, clientsId, ...datas } = payload;
//   const usersData = await User.find({ _id: { $in: usersId } }).select('image');
//   const usersImages = usersData.map(user => user.image);
//   const clientsData = await User.find({ _id: { $in: clientsId } }).select('image');
//   const clientsImages = clientsData.map(client => client.image);  

//   if (!usersId || usersId.length === 0) {
//     throw new Error('No usersId provided or the usersId array is empty');
//   }

//   const updateStartsAt = new Date(startsAt).toISOString();
//   const updateEndsAt = new Date(endsAt).toISOString();

//   const data = {
//     id: lastDocumentId + 1,
//     title: datas.title,
//     budget: datas.budget,
//     priority: datas.priority,
//     status: datas.status,
//     tags: datas.tags,
//     users: usersImages,
//     usersId,
//     clientsId,
//     clients: clientsImages,
//     startsAt: updateStartsAt,
//     endsAt: updateEndsAt,
//   };

//   const session = await mongoose.startSession();
//   try{
//     session.startTransaction()
//     const result = await Project.create([data], {session});
//   const assignedProjectCounts = await Promise.all(
//     usersId.map(async (userId) => {
//       const count = await Project.countDocuments({
//         usersId: { $in: [userId] },
//       }).session(session);
//       return { userId, assignedProjectCount: count };
//     })
//   );
//    await Promise.all(
//     assignedProjectCounts.map(async (item)=> {
//       const result = await User.findByIdAndUpdate(item.userId, {projects : item.assignedProjectCount } , {new : true, runValidators : true, session } )
//       return result
//     } )
//   )
//   await session.commitTransaction();
//   await session.endSession(); 
//   return result;
//   }
//   catch(err : any){
//     await session.abortTransaction(); 
//     await session.endSession(); 
//     throw new Error(err);
//   }
  
// };



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




const updateMainProjectsSingleDataIntoDB = async (id : string , payload : Partial<TProjuct> ) =>{
  console.log({id}, {payload});
  
  const result =  await Project.findByIdAndUpdate(id, payload, {
    new : true,
    runValidators : true
  })
  return result
}



// ============>>>>> updateMainProjectsSingleDataIntoDB ei update function ta niye pore kaj korte hobe 



// const updateMainProjectsSingleDataIntoDB = async (id: string, payload: Partial<TProjuct>) => {
//   console.log({id}, {payload});

//   const userIds = payload?.users ;
//   const objectIds = userIds.map(id => new mongoose.Types.ObjectId(id));
 

//   const session = await mongoose.startSession();
//   try {
//     session.startTransaction();

//     if (userIds && Array.isArray(userIds)) {
//       const usersData = await User.find({ _id: { $in: userIds } }).select('image');
//       const usersImages = usersData.map(user => user.image);
//       payload.users = usersImages;
//     }

//     const result = await Project.findByIdAndUpdate(id, payload, {
//       new: true,
//       runValidators: true,
//       session, 
//     });

//     const assignedProjectCounts = await Promise.all(
//       objectIds.map(async (userId) => {
//         const count = await Project.countDocuments({
//           usersId: { $in: [userId] },
//         });
//         return { userId, assignedProjectCount: count };
//       })
//     );
//     await Promise.all(
//       assignedProjectCounts.map(async (item) => {
//         await User.findByIdAndUpdate(
//           item.userId,
//           { projects: item.assignedProjectCount },
//           { new: true, runValidators: true }
//         );
//       })
//     );

//     await session.commitTransaction();
//     return result;
//   } catch (err: any) {
//     await session.abortTransaction();
//     throw new Error(err);
//   } finally {
//     await session.endSession();
//   }
// };

// const updateMainProjectsSingleDataIntoDB = async (id: string, payload: Partial<TProjuct>) => {
//   console.log({ id }, { payload });

//   const userIds = payload?.users; // This should be an array of user IDs
//   const objectIds = userIds.map(id => new mongoose.Types.ObjectId(id));

//   const session = await mongoose.startSession();
//   try {
//     session.startTransaction();

//     if (userIds && Array.isArray(userIds)) {
//       // Fetch user images based on the provided user IDs
//       const usersData = await User.find({ _id: { $in: userIds } }).select('image');
//       const usersImages = usersData.map(user => user.image);
      
//       // Update only the users field with the image URLs
//       payload.users = usersImages; // Set the users field to the fetched images
//       payload.usersId = userIds
//     }

//       // Update the project with the new users (image URLs)
//       const result = await Project.findByIdAndUpdate(id, payload, {
//         new: true,
//         runValidators: true,
//         session,
//       });

//     // Calculate assigned project counts for each user based on usersId
//     const assignedProjectCounts = await Promise.all(
//       objectIds.map(async (userId) => {
//         const count = await Project.countDocuments({
//           usersId: { $in: [userId] },
//         });
//         return { userId, assignedProjectCount: count };
//       })
//     );

//     console.log(assignedProjectCounts);
    

//     // Update the projects field in the User collection based on assigned project counts
//     await Promise.all(
//       assignedProjectCounts.map(async (item) => {
//         await User.findByIdAndUpdate(
//           item.userId,
//           { projects: item.assignedProjectCount }, // Update projects field
//           { new: true, runValidators: true, session }
//         );
//       })
//     );

  

//     await session.commitTransaction();
//     return result;
//   } catch (err: any) {
//     await session.abortTransaction();
//     throw new Error(err);
//   } finally {
//     await session.endSession();
//   }
// };

// const updateMainProjectsSingleDataIntoDB = async (id: string, payload: Partial<TProjuct>) => {
//   console.log(472, id, payload);

//   const userIds = payload?.users; // This should be an array of user IDs
//   const objectIds = userIds.map(id => new mongoose.Types.ObjectId(id));

//   const session = await mongoose.startSession();
//   try {
//     session.startTransaction();

//     if (userIds && Array.isArray(userIds)) {
//       const usersData = await User.find({ _id: { $in: userIds } }).select('image');
//       const usersImages = usersData.map(user => user.image);      
//       payload.users = usersImages; 
//       payload.usersId = userIds; 
//     }

//     const result = await Project.findByIdAndUpdate(id, payload, {
//       new: true,
//       runValidators: true,
//       session,
//     });

 
//     // if(result){
//     const assignedProjectCounts = await Promise.all(
//       objectIds.map(async (userId) => {
//         const count = await Project.countDocuments({
//           usersId: { $in: [userId] },
//         });
//         return { userId, assignedProjectCount: count };
//       })
//     );

//     console.log(assignedProjectCounts);
    

   

//     await Promise.all(
//       assignedProjectCounts.map(async (item) => {
//         await User.findByIdAndUpdate(
//           item.userId,
//           { projects: item.assignedProjectCount },
//           { new: true, runValidators: true, session }
//         );
//       })

//     );

//     // }





//     await session.commitTransaction();
//     return result;
//   } catch (err: any) {
//     await session.abortTransaction();
//     throw new Error(err);
//   } finally {
//     await session.endSession();
//   }
// };




const updateProjectIntoDB = async (id: string, keyName : string , payload: Partial<TProjuct>) => {  
  const update = { [keyName]: payload };
  const updatedProject = await Project.findByIdAndUpdate(id, update, {
    new: true, 
    runValidators: true,
  });
  return updatedProject
};

const deleteProjectsIntoDB = async (payload : any ) => {
  try {
    if (!Array.isArray(payload) || !payload.every(id => typeof id === 'string')) {
      throw new Error('Invalid payload format');
    }
    const objectIds = payload.map(id => new mongoose.Types.ObjectId(id));   

    const result = await Project.deleteMany({ _id: { $in: objectIds } });

    return result;
  } catch (error) {
    console.error('Error deleting projects:', error);
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
