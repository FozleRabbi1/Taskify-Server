import { model, Schema } from 'mongoose';
import { TProjuct } from './Projects.interface';

const ProjectSchema: Schema = new Schema<TProjuct>({
  id: {
    type: Number,
    required: [true, 'User ID is required'],
    unique: true,
  },
    title: { type: String, required: true },
  users: { type: [String], required: true },
  clients: { type: [String], required: true },
  status: { 
    type: String, 
    enum: ["On Going", "Started", "Default", "In Review", "Completed"], 
    required: true 
  },
  priority: { 
    type: String, 
    enum: ["Default", "High", "Medium", "Low"], 
    required: true 
  },
  budget: { type: String, required: true },
  tags: { type: [String], required: true },
  isFavourite:{ type : String, enum : ["true", "favourite"] },
  startsAt: { type: Date, required: true },
  endsAt: { type: Date, required: true }
},
);

export const Project = model<TProjuct>('Project', ProjectSchema);
