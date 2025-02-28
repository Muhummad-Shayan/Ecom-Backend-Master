import mongoose from "mongoose"
import { sendResponse } from "../helper/response.js"
import Product from "../models/productSchema.js"

const getSingleProduct = async (req,res)=>{
    try {
        
        const productId = req.params.productId

        if (!productId || !mongoose.Types.ObjectId.isValid(productId)) return sendResponse(400,res,null,"Plz Send Product Id To Fetch")

        const singleProduct = await Product.findOne({_id:productId})

        return sendResponse(200,res,singleProduct,"Single Product Fetch Successfully")

    } catch (error) {
        console.error("Error in fetching single product",error.message);
        sendResponse(500,res,null,"Internal Server Error",error.message)
    }
}

const getAllProducts = async (req,res)=>{
    try {
        const allProducts = await Product.find()
        const countProducts = await Product.countDocuments()
        sendResponse(200,res,{TotalProducts:countProducts,allProducts},"All Products Fetch Successfully")

    } catch (error) {
        console.error("Error in fetching single product",error.message);
        sendResponse(500,res,null,"Internal Server Error",error.message)
    }
}


// const getProductsByCategory = async (req,res)=>{
//     try {
        
        


//     } catch (error) {
//         console.error("Error In Fetching Products",error.message);
//         sendResponse(500,res,null,"Internal Server Error",error.message)
        
//     }
// }


export {getSingleProduct, getAllProducts}