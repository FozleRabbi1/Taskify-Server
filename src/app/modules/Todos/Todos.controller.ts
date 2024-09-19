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

const updateTodos = catchAsync(async (req, res) => {
    const result = await TodosServices.updateTodosIntoDB(req?.params?.id, req?.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Todo Update Successfully',
      data: result,
    });
  });

const deleteTodos = catchAsync(async (req, res) => {
  const deleteIdArray = req?.body?.idArray;  
    const result = await TodosServices.deleteTodoFromDB(deleteIdArray);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Todo Delete Successfully',
      data: result,
    });
  });


  export const TodosController = {
    getAllTodos,
    checkedTodos,
    updateTodos,
    deleteTodos
  }