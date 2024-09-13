/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose from "mongoose";
import { Project } from "./Projects.module";
import { TProjuct } from "./Projects.interface";
import QueryBuilder from "../../builder/QueryBuilder";

interface DateRangeQuery {
  firstDate?: Date;
  secondDate?: Date;
}


// const getAllProjects = async (query: Record<string, unknown>) => {  
//   console.log(query.date);
  
//   if (query.date) {
//     const dateRange = query.date as string;
//     const [startDateString, endDateString] = dateRange.split(',');
//     const startDate = new Date(startDateString);
//     const endDate = new Date(endDateString);

//     query.dateInfo = {
//       firstDate: startDate,
//       secondDate: endDate,
//     } as DateRangeQuery;    
//     delete query.date;
//   }

//   if (query.dateInfo) {
//     const { firstDate, secondDate } = query.dateInfo as DateRangeQuery;
//     const result = await Project.aggregate([
//       {
//         $addFields: {
//           dateAtISO: {
//             $dateFromString: {
//               dateString: `$${query.fieldName}`,
//               format: "%B %d, %Y", 
//             },
//           },
//         },
//       },
//       {
//         $match: {
//           dateAtISO: {
//             $gte: firstDate,
//             $lte: secondDate,
//           },
//         },
//       },
//     ]);  
//     return result;
//   } 

//   const studentQuery = new QueryBuilder(
//     Project.find(), query,
//   )
//     .search(["title"])
//     .filter()
//     .sort()
//     .fields();
  
//   const result = await studentQuery.modelQuery;
//   return result;
// };

const getAllProjects = async (query: Record<string, unknown>) => {
  if (query.date) {
    const dateRange = query.date as string;
    const [startDateString, endDateString] = dateRange.split(',');
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    query.dateInfo = {
      firstDate: startDate,
      secondDate: endDate,
    } as DateRangeQuery;    
    delete query.date;
  }

  if (query.dateInfo) {
    const { firstDate, secondDate } = query.dateInfo as DateRangeQuery;
    const result = await Project.aggregate([
      {
        $match: {
          [query.fieldName as string]: {
            $gte: firstDate,
            $lte: secondDate,
          },
        },
      },
    ]);  
    return result;
  } 

  const studentQuery = new QueryBuilder(
    Project.find(), query,
  )
    .search(["title"])
    .filter()
    .sort()
    .fields();
  
  const result = await studentQuery.modelQuery;
  return result;
};

const duplicateDataIntoDB = async (mainId: string, title: string) => {
  try {
    const lastDocument = await Project.findOne().sort({ _id: -1 }).exec();
    const lastDocumentId = lastDocument?.id || 0;

    const project = await Project.findById(mainId);
    if (!project) {
      throw new Error('Project not found');
    }
    
    const newProjectData = project.toObject() as Partial<typeof project> & { _id?: mongoose.Types.ObjectId };
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
  getAllProjects,
  duplicateDataIntoDB,
  deleteProjectsIntoDB,
  getAllFavouriteProjects,
  updateFavouriteProjectIntoDB,
  updateProjectIntoDB
};
