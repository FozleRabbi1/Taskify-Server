import { model, Schema } from "mongoose";
import { TTags } from "./Tags.interface";

const TagsSchema : Schema = new Schema<TTags>({
    id : {
        type : Number,
        required : [true, "Id is required"],
        unique : true
    },
    title : {
        type : String,
        required : [true, "Title is required"],
    },
    preview : {
        type : String,
        required : [true, "priview is required"]
    }
})

export const Tags = model<TTags>('Tags', TagsSchema);