import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { NoteServices } from "./Notes.services";

const createNots = catchAsync(async (req, res) => {
    const result = await NoteServices.createNoteIntoDB(req?.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Note Create Successfully',
      data: result,
    });
  });

const getAllNotes = catchAsync(async (req, res) => {
    const result = await NoteServices.getAllNotesFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Note Create Successfully',
      data: result,
    });
  });

  
  export const NotesControllers = {
    createNots,
    getAllNotes
  };
  