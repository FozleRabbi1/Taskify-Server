import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TodosServices } from "./Todos.service";

const getAllTodos = catchAsync(async (req, res) => {
    const result = await TodosServices.getAllTodosFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get All Todos Successfully',
      data: result.result,
      meta : result.checkedCount
    });
  });

const checkedTodos = catchAsync(async (req, res) => {
    const result = await TodosServices.checkedTodosIntoDB(req?.params?.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Todo checked Successfully',
      data: result,
    });
  });



  export const TodosController = {
    getAllTodos,
    checkedTodos
  }