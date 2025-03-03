import { sendResponse } from "../helper/response.js";
import { createOrder } from "../utils/OrdersFunctionality.js";
import orderValidationSchema from "../validations/orderValidations.js";



const orderProduct = async (req ,res) =>{
    try {
        const ProductDetail = req.body
        const {error } = orderValidationSchema.validate(ProductDetail)
        if (error) return sendResponse(400,res,null,error.message)
        
        const orderResult = await createOrder(ProductDetail)
        


    } catch (error) {
        console.error("Eror in orderProduct", error);
        return  sendResponse(500,res,null,"Internal Server Error",error.message)
        
    }
} 

export {
    orderProduct
}
