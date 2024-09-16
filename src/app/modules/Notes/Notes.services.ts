import { TNote } from "./Notes.interface";
import { Note } from "./Notes.module";

const createNoteIntoDB = async ( payload : Partial<TNote> ) => {
    const result = await Note.create(payload);
    return result;
  };


const getAllNotesFromDB = async (  ) => {
    const result = await Note.find();
    return result;
  };

  
  export const NoteServices = {
    createNoteIntoDB,
    getAllNotesFromDB
  };
