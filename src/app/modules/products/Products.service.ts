/* eslint-disable @typescript-eslint/no-explicit-any */
import config from "../../config";
import Product from "./Projects.module";
import paypal from "paypal-rest-sdk"

paypal.configure({
  'mode': 'sandbox',
  'client_id': config.pay_clien_id as string,
  'client_secret': config.pay_clien_secret as string
});


const getAllProductsFromDB = async () => {
    const result = await Product.find();
    return result;
  };



const paymentWithPaypal = async (amount : string ) => {  
  
  try {
    
    const create_payment_json = {
        intent: 'sale',
        payer: {
          payment_method: 'paypal',
        },
        redirect_urls: {
          return_url: 'http://localhost:5173/success',
          cancel_url: 'http://localhost:5173/failed',
        },
        transactions: [
          {
            item_list: {
              items: [
                {
                  name: 'item',
                  sku: 'item',
                  price: amount,
                  currency: 'USD',
                  quantity: 1,
                },
              ],
            },
            amount: {
              currency: 'USD',
              total: amount,
            },
            description: 'This is the payment description.',
          },
        ],
      };




  
      const paymentResponse = await new Promise((resolve, reject) => {
        paypal.payment.create(create_payment_json, (error, payment) => {
          if (error) {
            reject(error);
          } else {
            resolve(payment);
          }
        });
      });
  
      return paymentResponse;
    } catch (error) {
      console.error('PayPal Payment Errorrrrrrr:', error);
      throw new Error('Payment processing failed');
    }
  };



 const isSuccess = async (query: any) => {
  try {
    const payerId = query.PayerID;
    const paymentId = query.paymentId;

    if (!payerId || !paymentId) {
      console.log("Missing payerId or paymentId");
      return { success: false, message: "Missing payerId or paymentId" };
    }

    const execute_payment_json = {
      payer_id: payerId,
      transactions: [
        {
          amount: {
            currency: "USD",
            total: "550.00",
          },
        },
      ],
    };

    const payment = await new Promise((resolve, reject) => {
      paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
        if (error) {
          reject(error);
        } else {
          resolve(payment);
        }
      });
    });

    console.log("Execute Payment Response:", payment);
    const parsedResponse = JSON.parse(JSON.stringify(payment));
    const transactions = parsedResponse.transactions[0];

    console.log("transactions", transactions);

    return { success: true, data: transactions };
  } catch (error) {
    console.error("Error executing payment: ", error);
    return { success: false, message: "Payment execution failed" };
  }
};




  




  
  export const ProductServices = {
    getAllProductsFromDB,
    paymentWithPaypal,
    isSuccess
  };
  