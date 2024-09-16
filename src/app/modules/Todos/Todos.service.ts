import { Todos } from "./Todos.module";


const getAllTodosFromDB = async () => {  
    const result = await Todos.find().sort({checked : 1})
    return result;
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




  export const TodosServices = {
    getAllTodosFromDB,
    checkedTodosIntoDB
  }