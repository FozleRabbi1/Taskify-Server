import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TagsServices } from "./Tags.service";

const getAllTags = catchAsync(async (req, res) => {
    const result = await TagsServices.getAllTagsFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get All Tags Successfully',
      data: result,
    });
  });

  export const TagsController = {
    getAllTags
  }