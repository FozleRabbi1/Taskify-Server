import  { model, Schema } from 'mongoose';
import { TNote } from './Notes.interface';

const noteSchema  = new Schema<TNote>({
    title: {
    type: String,
    required: true,
  },
  contentData: {
    type: String,
    required: true,
    trim: true
  },
  color: {
    type: String,
    required: true,
  },
  finalRotation: {
    type: Number,
    required: true,
  },
}, {timestamps : true});

export const Note = model<TNote>('note', noteSchema);

