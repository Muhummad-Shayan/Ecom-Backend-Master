import { sendResponse } from "../helper/response.js";
import Order from "../models/orderSchema.js";
import { createOrder, getOrdersById } from "../utils/OrdersFunctionality.js";
import orderValidationSchema from "../validations/orderValidations.js";



const orderProduct = async (req ,res) =>{
    try {
        const ProductDetail = req.body
        const {error } = orderValidationSchema.validate(ProductDetail)
        if (error) return sendResponse(400,res,null,error.message)
        
        const orderResult = await createOrder(ProductDetail)
        
        return sendResponse(201,res,orderResult,"Ordered Successfully")

    } catch (error) {
        console.error("Eror in orderProduct", error);
        return  sendResponse(500,res,null,"Internal Server Error",error.message)
        
    }
} 


const getAllOrders = async (req ,res) =>{
    try {
        
        const orders = await Order.find().sort({createdAt : -1}).populate("user","name","email","contact","address").populate("items.product")
        return sendResponse(200 ,res,orders,"Orders Fetched Successfully")

    } catch (error) {
        console.error("Error in getOrders",error.message);
        sendResponse(500,res,null,"Internal Server Error",error.message)
        
    }
}


const getMyOrders = async (req ,res) =>{
    try {
        
        const orders = await getOrdersById(req.user._id)
        return sendResponse(200,res,orders,"My Orders Fetched Successfully")


    } catch (error) {
        console.error("Error in getMyOrders",error.message);
        sendResponse(500,res,null,"Internal Server Error",error.message)
        
    }
}


export {
    orderProduct,
    getAllOrders,
    getMyOrders
}
