import { sendResponse } from "../helper/response.js";
import Order from "../models/orderSchema.js";
import { createOrder, getOrdersById, updateOrderByID } from "../utils/OrdersFunctionality.js";
import {adminUpdateOrderSchema, orderValidationSchema} from "../validations/orderValidations.js";



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
        
        const orders = await Order.find().populate("user","name email contact address").populate("items.product").sort({createdAt : -1})
        const noOfOrders = orders.length
        return sendResponse(200 ,res,{TotalOrders:noOfOrders ,orders},"Orders Fetched Successfully")
        
    } catch (error) {
        console.error("Error in getOrders",error.message);
        sendResponse(500,res,null,"Internal Server Error",error.message)
        
    }
}


const getMyOrders = async (req ,res) =>{
    try {
        
        const orders = await getOrdersById(req.user.id)
        const TotalOrders = orders.length
        return sendResponse(200,res,{TotalOrders:TotalOrders,  orders},"My Orders Fetched Successfully")


    } catch (error) {
        console.error("Error in getMyOrders",error.message);
        sendResponse(500,res,null,"Internal Server Error",error.message)
        
    }
}

const updateOrder = async (req,res)=> {
    try {
        const {id} = req.params
        
        const {error} = adminUpdateOrderSchema.validate(req.body)
        if (error) return sendResponse(400,res,null,error.message)
        
        const updatedOrder = await updateOrderByID(id,req.body)
        return sendResponse(201,res,updatedOrder,"Order Updated Successfully")

    } catch (error) {
        console.error("Error in updateOrder",error.message);
        sendResponse(500,res,null,"Internal Server Error",error.message)
        
    }
} 


export {
    orderProduct,
    getAllOrders,
    getMyOrders,
    updateOrder
}
