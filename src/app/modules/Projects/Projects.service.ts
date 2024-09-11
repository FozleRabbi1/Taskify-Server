/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose from "mongoose";
import { Project } from "./Projects.module";
import { TProjuct } from "./Projects.interface";
import QueryBuilder from "../../builder/QueryBuilder";

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
        $addFields: {
          dateAtISO: {
            $dateFromString: {
              dateString: `$${query.fieldName}`,
              format: "%B %d, %Y", 
            },
          },
        },
      },
      {
        $match: {
          dateAtISO: {
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


// const duplicateDataIntoDB  = async(mainId : string, title : string) =>{
    
//   const lastDocument = await Project.findOne().sort({ _id: -1 }).exec();
//    const lastDocumentId = lastDocument?.id;
     
//   try {
//     const project = await Project.findById({_id : mainId});
//     if (!project) {
//       throw new Error('Project not found');
//     }
//     const newProjectData = project.toObject();
//     delete newProjectData._id;

    
//     const createdAt = new Date();
//     const updatedAt = new Date();

//     const duplicatedProject = new Project(newProjectData);
//     const {users,clients, status, priority , budget, tags} = duplicatedProject
//     const newData = {
//       title ,
//       id : lastDocumentId + 1,
//       users,
//       clients, 
//       status, 
//       priority, 
//       budget,
//       tags,
//       createdAt,
//       updatedAt      
//     }

//     console.log(newData);  
//     // await duplicatedProject.save();
//     // return duplicatedProject;
//   } catch (error) {
//     console.error('Error duplicating project:', error);
//   }  

// }

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

const duplicateDataIntoDB = async (mainId: string, title: string) => {
  try {
    // Find the most recent document to get the lastDocumentId
    const lastDocument = await Project.findOne().sort({ _id: -1 }).exec();
    const lastDocumentId = lastDocument?.id || 0;

    // Find the project to duplicate
    const project = await Project.findById(mainId);
    if (!project) {
      throw new Error('Project not found');
    }
    
    // Convert project data to a plain object and remove the _id field
    const newProjectData = project.toObject();
    delete newProjectData._id;

    // Create new dates
    const startsAt = formatDate(new Date());
    const endsAt = formatDate(new Date());

    // Create a new project with the updated data
    const newProject = new Project({
      ...newProjectData,
      title,
      id: lastDocumentId + 1,
      startsAt, 
      endsAt  
    });

    // Save the new project to the database
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
