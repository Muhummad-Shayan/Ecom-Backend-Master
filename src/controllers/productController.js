import mongoose from "mongoose";
import { deleteLocalFiles } from "../helper/deleteFiles.js";
import { sendResponse } from "../helper/response.js";
import Product from "../models/productSchema.js";
import productValidationSchema from "../validations/productValidation.js";
import { updateProductById, uploadProduct } from "../utils/productFunctionality.js";

const createProduct = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return sendResponse(400, res, null, "No files uploaded!");
        }

        const thumbnailPath = req.files.thumbnail?.[0]?.path;
        const imagePaths = req.files.images ? req.files.images.map(file => file.path) : [];
        let variations = [];

        try {
            variations = req.body.variations ? JSON.parse(req.body.variations) : [];
            req.body.variations = variations
        } catch (err) {
            console.error("Invalid variations JSON", err);
            return sendResponse(400, res, null, "Invalid variations format");
        }
        
        const { error } = productValidationSchema.validate(req.body, { abortEarly: false });

        if (error) {
            deleteLocalFiles([thumbnailPath, ...imagePaths]);
            return sendResponse(400, res, null, "Validation Failed", error.details);
        }
        
        const product = await uploadProduct(req.body,variations,imagePaths,thumbnailPath)

        return sendResponse(201, res, product, "Product uploaded successfully");

    } catch (error) {

        console.error("Error in creating product:", error);
        return sendResponse(500, res, null, "Internal Server Error", error.message);
        
    }
};


const deleteProduct = async (req,res)=>{
    try {
        const {id} = req.params
        
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return sendResponse(400, res, null, "Invalid Product ID");
        }
        const product = await Product.findByIdAndDelete({_id:id})
        if (!product) {
            return sendResponse(404,res,null,"Product Not Found")
        }
        return sendResponse(202,res,product._id,"Product Delete Successfully By Id")
        
    } catch (error) {
        console.error("Error in deleting product",error.message);
        return sendResponse(500,res,null,"Internal Server Error",error.message)
        
    }
}



const updateProduct = async (req,res)=>{
    try {
        const productId = req.params.id

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return sendResponse(400,res,null,"Invalid MongoDB Id")
        }
        
        const updatepro = await updateProductById(productId,req.body)
        
        if (!updatepro) {
            return sendResponse(404,res,null,"Product Not Found")
        }

        return sendResponse(201,res,updatepro,"Product Updated Successfully")

        
    } catch (error) {
        console.error("Error in updating",error.message);
        return sendResponse(500,res,null,"Internal Server Error",error.message)
        
    }
}








export { createProduct , deleteProduct , updateProduct };
