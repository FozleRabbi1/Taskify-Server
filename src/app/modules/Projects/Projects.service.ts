/* eslint-disable @typescript-eslint/no-explicit-any */
// import { IProduct } from './Products.interface';
// import { Product } from './Products.module';

import mongoose from "mongoose";
import { Project } from "./Projects.module";
import { TProjuct } from "./Projects.interface";
import QueryBuilder from "../../builder/QueryBuilder";


// const getAllProjects = async (query: any) => {  

//   const result = await Project.find(query);

//   return result;
// };

const getAllProjects = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    Project.find() , query,
  )
    .search(["title"])
    .filter()
    // .sort("id")
    // .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return  result;
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
  deleteProjectsIntoDB,
  getAllFavouriteProjects,
  updateFavouriteProjectIntoDB,
  updateProjectIntoDB
};
