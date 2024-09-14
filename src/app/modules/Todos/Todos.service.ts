import { Todos } from "./Todos.module";


const getAllTodosFromDB = async () => {  
    const result = await Todos.find()
    return result;
  };




  export const TodosServices = {
    getAllTodosFromDB,
    // updateTagsIntoDB,
    // deleteTagsInfoDB
  }