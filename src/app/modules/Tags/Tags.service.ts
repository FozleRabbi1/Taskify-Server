import { Tags } from "./Tags.module";


const getAllTagsFromDB = async () => {  
    const result = await Tags.find();
    return result;
  };

  export const TagsServices = {
    getAllTagsFromDB
  }