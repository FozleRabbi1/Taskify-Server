import  { model, Schema } from 'mongoose';
import { TNote } from './Notes.interface';

const noteSchema  = new Schema<TNote>({
    title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  color: {
    type: String,
    required: true,
    trim: true
  },
}, {timestamps : true});

export const Note = model<TNote>('note', noteSchema);

