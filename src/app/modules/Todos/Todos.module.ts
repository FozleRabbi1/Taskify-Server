import { model, Schema } from "mongoose";
import { TTodos } from "./Todos.interface";

const TodoSchema : Schema = new Schema<TTodos>({
    
    title : {
        type : String,
        required : [true, "Title is required"],
    },
    title2 : {
        type : Date,
        required : [true, "Title2 is required"]
    },
    Priority : { type : String, required : [true, "Priority is required"] },
    Description : { type :  String , required : [true, "Description is required"]},
    UpdatedAt : { type : Date , required : [true, "UpdateAt is required"] },
})

export const Todos = model<TTodos>('Todos', TodoSchema);