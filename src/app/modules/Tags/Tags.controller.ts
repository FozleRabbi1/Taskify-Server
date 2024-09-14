import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TagsServices } from "./Tags.service";

const getAllTags = catchAsync(async (req, res) => {
    const result = await TagsServices.getAllTagsFromDB(req?.query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get All Tags Successfully',
      data: result,
    });
  });

const updateTags = catchAsync(async (req, res) => {
    const result = await TagsServices.updateTagsIntoDB(req?.params.id, req?.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Update Tags Successfully',
      data: result,
    });
  });

const deleteTags = catchAsync(async (req, res) => {
    const result = await TagsServices.deleteTagsInfoDB(req?.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Delete Tags Successfully',
      data: result,
    });
  });

  export const TagsController = {
    getAllTags,
    updateTags,
    deleteTags
  }