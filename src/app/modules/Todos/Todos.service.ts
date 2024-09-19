import mongoose from "mongoose";
import { TTodos } from "./Todos.interface";
import { Todos } from "./Todos.module";


const getAllTodosFromDB = async () => {  
    const result = await Todos.find().sort({checked : 1})
    const checkedCount = await Todos.countDocuments({ checked: false });
    return {result, checkedCount};
  };

const checkedTodosIntoDB = async (id : string) => {  
  const isChecked = await Todos.findById(id).select("checked")
  if(!isChecked?.checked){
    const result = await Todos.updateOne({_id : id}, { $set : {checked : true} })
    return result
  }
  const result = await Todos.updateOne({_id : id}, { $set : {checked : false} })
    return result;
  };

  const updateTodosIntoDB = async (id: string, payload : Partial<TTodos>)=>{
    const result = await Todos.findByIdAndUpdate(id, payload , {new : true, runValidators : true})
    return result    
  }

  const deleteTodoFromDB = async (payload : string[]) => {
    // try {
    //     const result = await Todos.deleteMany({ _id: { $in: payload } });
    //     return result;
    // } catch (error) {
    //     console.error("Error deleting todos:", error);
    //     throw error;
    // }
    try {
      if (!Array.isArray(payload) || !payload.every(id => typeof id === 'string')) {
        throw new Error('Invalid payload format');
      }
      const objectIds = payload.map(id => new mongoose.Types.ObjectId(id));
      
  
      const result = await Todos.deleteMany({ _id: { $in: objectIds } });
      return result;
    } catch (error) {
      console.error('Error deleting projects:', error);
      throw error;
    }

};



  export const TodosServices = {
    getAllTodosFromDB,
    checkedTodosIntoDB,
    updateTodosIntoDB,
    deleteTodoFromDB
  }