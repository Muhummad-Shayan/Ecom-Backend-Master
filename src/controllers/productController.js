import mongoose from "mongoose";
import { deleteLocalFiles } from "../helper/deleteFiles.js";
import { sendResponse } from "../helper/response.js";
import uploadToCloudinary from "../helper/uploadCloudinary.js";
import Product from "../models/productSchema.js";
import productValidationSchema from "../validations/productValidation.js";
import fs from 'fs'

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
        
        const uploadThumbnail = await uploadToCloudinary(thumbnailPath);
        fs.unlinkSync(thumbnailPath); 

        
        let uploadedImages = [];
        if (imagePaths.length > 0) {
            for (let file of imagePaths) {
                let uploadResult = await uploadToCloudinary(file);
                uploadedImages.push(uploadResult);
                fs.unlinkSync(file);
            }
        }

        
        

        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            discountPrice: req.body.discountPrice || null,
            stock: req.body.stock,
            brand: req.body.brand,
            gender: req.body.gender,
            category: req.body.category,
            subCategory: req.body.subCategory,
            variations: variations,
            thumbnail: uploadThumbnail,
            images: uploadedImages,
        });

        await product.save();
        return sendResponse(201, res, product, "Product uploaded successfully");

    } catch (error) {

        console.error("Error in creating product:", error);
        return sendResponse(500, res, null, "Internal Server Error", error.message);
        
    }
};


const deleteProduct = async (req,res)=>{
    try {
        const id = req.params.id
        
        
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

        const {name,description,price,discountPrice,stock,brand,gender,category,subCategory,variations , } = req.body

        const updatepro = await Product.findByIdAndUpdate(
            productId,
            { 
                $set:{
                ...(name && {name}),
                ...(description && {description}),
                ...(price && {price}),
                ...(discountPrice && {discountPrice}),
                ...(stock && {stock}),
                ...(brand && {brand}),
                ...(gender && {gender}),
                ...(category && {category}),
                ...(subCategory && {subCategory}),
                ...(variations && {variations}),
                
                
                }
            },
            {new:true}
        ) 
        if (!updatepro) {
            return sendResponse(404,res,null,"Product Not Found")
        }

        return sendResponse(201,res,updatepro,"Product Updated Successfully")

        
    } catch (error) {
        console.error("Error in updating",error.message);
        return sendResponse(500,res,null,"Internal Server Error",error.message)
        
    }
}




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





export { createProduct , deleteProduct , updateProduct , getSingleProduct};
