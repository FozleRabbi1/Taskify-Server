import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { visitorService } from "./visitor.service";


const GetVisitorCounter= catchAsync(async (req, res) => {
    const result = await visitorService.visitorGetFromDB();    
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Add Visitor Counter',
      data: result,
    });
  });

const visitorCounterAddFunction = catchAsync(async (req, res) => {
    const result = await visitorService.visitorAddIntoDB(req?.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Add Visitor Counter',
      data: result,
    });
  });

  export const visitorController = {
    GetVisitorCounter,
    visitorCounterAddFunction
  }