import httpStatus from "http-status";
import { catchAsync } from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { contactsService } from "./ManageContacts.service";

const createContact = catchAsync(async (req, res) => {
    const result = await contactsService.addContactInfoIntoDB(req?.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Contact Create Successfully',
      data: result,
    });
  });

const getAllContact = catchAsync(async (req, res) => {
    const result = await contactsService.getAllContactDataFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get All Contact Successfully',
      data: result,
    });
  });

  export const contactsController = {
    createContact,
    getAllContact
  }