import { model, Schema } from "mongoose";
import { TVsitor } from "./visitor.interface";

const VisitorSchema = new Schema<TVsitor>({
   id : { type : String },
 visitorCounter : {
    type : Number,
    required : [true, "Number is required"]
 }

})

export const Visitor = model<TVsitor>('Visitor', VisitorSchema);