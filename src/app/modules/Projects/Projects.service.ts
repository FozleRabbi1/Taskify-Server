/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose from "mongoose";
import { Project } from "./Projects.module";
import { TProjuct } from "./Projects.interface";
import QueryBuilder from "../../builder/QueryBuilder";


// const getAllProjects = async (query: Record<string, unknown>) => {
//   console.log(query);
  
//   const studentQuery = new QueryBuilder(
//     Project.find() , query,
//   )
//     .search(["title"])
//     .filter()
//     .sort()
//     // .paginate()
//     .fields();

//   const result = await studentQuery.modelQuery;
//   return  result;
// };

interface DateRangeQuery {
  firstDate?: Date;
  secondDate?: Date;
}


const getAllProjects = async (query: Record<string, unknown>) => {
  if (query.date) {
    const dateRange = query.date as string;
    const [startDateString, endDateString] = dateRange.split(',');

    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    query.createdAt = {
      firstDate: startDate,
      secondDate: endDate,
    } as DateRangeQuery;
    
    delete query.date;
  }

  if (query.createdAt) {
    const { firstDate, secondDate } = query.createdAt as DateRangeQuery;

    const result = await Project.aggregate([
      {
        $addFields: {
          createdAtISO: {
            $dateFromString: {
              dateString: "$createdAt",
              format: "%B %d, %Y", 
            },
          },
        },
      },
      {
        $match: {
          createdAtISO: {
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

// const getAllProjects = async (query: Record<string, unknown>) => {
//   // const { firstDate, secondDate } = query as { firstDate: string, secondDate: string };
//   console.log(query);

//   if (query.date) {
//         const dateRange = query.date as string;
//         const [startDateString, endDateString] = dateRange.split(',');
        
//   console.log(startDateString);
//   console.log(endDateString);
//   }

  

//   // if (firstDate && secondDate) {
//   //   const startDate = new Date(firstDate);
//   //   const endDate = new Date(secondDate);

//   //   // Build a query to convert `createdAt` field to a Date object and then filter by the range
//   //   const result = await Project.aggregate([
//   //     {
//   //       $addFields: {
//   //         createdAtISO: {
//   //           $dateFromString: {
//   //             dateString: "$createdAt",
//   //             format: "%B %d, %Y", // Format that matches your `createdAt` field (e.g., "September 07, 2024")
//   //           },
//   //         },
//   //       },
//   //     },
//   //     {
//   //       $match: {
//   //         createdAtISO: {
//   //           $gte: startDate,
//   //           $lte: endDate,
//   //         },
//   //       },
//   //     },
//   //   ]);

//   //   console.log(result);
//   //   return result;
//   // }

  
//   // If no date range is provided, return all projects
  
  
//   const studentQuery = new QueryBuilder(Project.find(), query)
//     .search(["title"])
//     .filter()
//     .sort()
//     .fields();

//   const result = await studentQuery.modelQuery;
//   return result;
// };




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
  deleteProjectsIntoDB,
  getAllFavouriteProjects,
  updateFavouriteProjectIntoDB,
  updateProjectIntoDB
};
