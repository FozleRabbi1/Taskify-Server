import { TNote } from "./Notes.interface";
import { Note } from "./Notes.module";

const createNoteIntoDB = async ( payload : Partial<TNote> ) => {
    const result = await Note.create(payload);
    return result;
  };


const getAllNotesFromDB = async (  ) => {
    const result = await Note.find();
    return result.reverse();
  };

const deleteNoteIntoDB = async (id : string ) => {
    const result = await Note.findByIdAndDelete(id);
    return result;
  };

const updateNoteIntoDB = async (id : string, payload : Partial<TNote> ) => {
    const result = await Note.findByIdAndUpdate(id, payload, {new : true, runValidators : true});
    return result;
  };

  
  export const NoteServices = {
    createNoteIntoDB,
    getAllNotesFromDB,
    deleteNoteIntoDB,
    updateNoteIntoDB
  };
