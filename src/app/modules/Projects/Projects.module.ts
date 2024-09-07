import { model, Schema } from 'mongoose';
import { TProjuct } from './Projects.interface';

const ProjectSchema: Schema = new Schema<TProjuct>({
  id: {
    type: String,
    required: [true, 'User ID is required'],
    unique: true,
  },
    title: { type: String, required: true },
  users: { type: [String], required: true },
  clients: { type: [String], required: true },
  status: { 
    type: String, 
    enum: ["On Going", "Started", "Default", "In Review"], 
    required: true 
  },
  priority: { 
    type: String, 
    enum: ["Default"], 
    required: true 
  },
  budget: { type: String, required: true },
  tags: { type: [String], required: true },
},
{
  timestamps: true,
},
);

export const Project = model<TProjuct>('Project', ProjectSchema);
