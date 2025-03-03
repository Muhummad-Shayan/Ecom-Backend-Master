import mongoose from "mongoose"
import { sendResponse } from "../helper/response.js"
import Product from "../models/productSchema.js"
import { fetchAllProductsFromMongoDb, fetchCategoryListByGenderFromMongoDB, fetchProductsByCategoryFromMongoDb, fetchProductsBySearchKeyFromMongoDb } from "../utils/readProductFunctionality.js"

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
        
        const filter = req.query

        const {TotalProducts,allProducts} = await fetchAllProductsFromMongoDb(filter)

        sendResponse(200,res,{TotalProducts:TotalProducts,allProducts},"All Products Fetch Successfully")

    } catch (error) {
        console.error("Error in fetching single product",error.message);
        sendResponse(500,res,null,"Internal Server Error",error.message)
    }
}


const getProductsCategoryListByGender = async (req,res)=>{
    try {
        
        const gender = req.params.gender
        if (!gender) return sendResponse(400,res,null,"Plz give a gender to fetch product")

        const CategoriesListByGender = await fetchCategoryListByGenderFromMongoDB(gender)
        
        return sendResponse(200,res,{CategoriesListByGender},)

    } catch (error) {
        console.error("Error in fetching single product",error.message);
        sendResponse(500,res,null,"Internal Server Error",error.message)
    }
}



const getProductsByCategory = async (req,res)=>{
    try {

        const category = req.params.category
        const filter = req.query
        const categoryProducts = await fetchProductsByCategoryFromMongoDb(category,filter)

        sendResponse(200,res,categoryProducts,"Category Products Fetched Successfully")
        
    } catch (error) {
        console.error("Error While Fetching products by category",error.message);
        sendResponse(500,res,null,"Internal Server Error",error.message)
        
    }
}

const handleSearchProducts = async (req,res)=>{
    try {
        
        const {q} = req.query
        
        
        const searchProducts = await fetchProductsBySearchKeyFromMongoDb(q)

        return sendResponse(200,res,searchProducts,"Product Fetched Successfully")

    } catch (error) {
        console.error("Error while handling search",error.message);
        return sendResponse(500,res,null,"Internal Server Error",error.message)
        
    }
}




export {getSingleProduct, getAllProducts,getProductsCategoryListByGender,getProductsByCategory,handleSearchProducts}