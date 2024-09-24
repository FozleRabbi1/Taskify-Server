import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductServices } from "./Products.service";

const getAllProducts = catchAsync(async (req, res) => {
    const result = await ProductServices.getAllProductsFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get All Products Successfully',
      data: result,
    });
  });

  
  const paymentWithPal = catchAsync(async (req, res) => { 
    // const amountt = Number(req?.query?.amount)
    const result = await ProductServices.paymentWithPaypal(req?.query?.amount as string);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Payment processed successfully",
      data: result,
    });
  });


  const success = catchAsync(async (req, res) => {
    const result = await ProductServices.isSuccess(req.query);
    if (result.success) {
      return res.redirect("http://localhost:5173/success");
    } else {
      return res.redirect("http://localhost:5173/failed");
    }
  });
  
  
  export const productControllers = {
    getAllProducts,
    paymentWithPal,
    success
  };
  