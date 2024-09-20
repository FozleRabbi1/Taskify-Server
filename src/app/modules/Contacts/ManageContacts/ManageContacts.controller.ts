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
    const result = await contactsService.getAllContactDataFromDB(req?.query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get All Contact Successfully',
      data: result,
    });
  });

  const updatesContactInfo = catchAsync(async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    
    const result = await contactsService.updateContactIntoDB(id,data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'update your Contact Data successfully',
      data: result,
    });
  });
  
  const deleteContacts= catchAsync(async (req, res) => {
    const deleteIdArray = req?.body?.idArray;
    const result = await contactsService.deleteContactsIntoDB(deleteIdArray );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'delete Contact Successfully',
      data: result,
    });
  });

  const duplicateData = catchAsync(async (req, res) => {
    const id = req.params.id
    const title = req.body.title
    const result = await contactsService.duplicateDataIntoDB(id, title);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Duplicate Projects Successfully',
      data: result,
    });
  });
  


  export const contactsController = {
    createContact,
    getAllContact,
    updatesContactInfo,
    deleteContacts,
    duplicateData
  }