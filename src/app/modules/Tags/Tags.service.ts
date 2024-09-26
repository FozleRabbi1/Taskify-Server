import QueryBuilder from "../../builder/QueryBuilder";
import { TTags } from "./Tags.interface";
import { Tags } from "./Tags.module";


const getAllTagsFromDB = async (query : Record<string , unknown>) => {  
  const tagsQuery = new QueryBuilder(
    Tags.find(), query
  )
  .search(["title"])

    const result = await tagsQuery.modelQuery
    return result;

  };
  
const updateTagsIntoDB = async (id : string, payload : Partial<TTags>) => { 
    const result = await Tags.findByIdAndUpdate(id, payload, {
      new : true,
      runValidators : true
    })
    return result;
  };

  const deleteTagsInfoDB = async (ids: { idArray: string[] }) => {
    try {
      const result = await Tags.deleteMany({
        _id: { $in: ids?.idArray } 
      });
      return result;
    } catch (error) {
      console.error("Error deleting tags:", error);
      throw error;
    }
  };
  

  export const TagsServices = {
    getAllTagsFromDB,
    updateTagsIntoDB,
    deleteTagsInfoDB
  }