import uploadToCloudinary from "../helper/uploadCloudinary.js";
import fs from 'fs'
import Product from "../models/productSchema";
import { deleteLocalFiles } from "../helper/deleteFiles.js";

const uploadProduct = async (productDetail,variations,imagePaths,thumbnail,) => {
    try {
        let uploadedImages = [];
        if (imagePaths.length > 0) {
            for (let file of imagePaths) {
                let uploadResult = await uploadToCloudinary(file);
                uploadedImages.push(uploadResult);
                fs.unlinkSync(file);
            }
        }

        const uploadThumbnail = await uploadToCloudinary(thumbnail);
        fs.unlinkSync(thumbnail); 
        

        const product = new Product({
            name: productDetail.name,
            description: productDetail.description,
            price: productDetail.price,
            discountPrice: productDetail.discountPrice || null,
            stock: productDetail.stock,
            brand: productDetail.brand,
            gender: productDetail.gender,
            category: productDetail.category,
            subCategory: productDetail.subCategory,
            variations: variations,
            thumbnail: uploadThumbnail,
            images: uploadedImages,
        });
        await product.save();
        deleteLocalFiles([...imagePaths,thumbnail])

        return product
        
    } catch (error) {
        throw new Error(`Error in creating product: ${error.message}`);
        
    }
}


const updateProductById = async (productId,productUpdateDetail)=>{
    try {

        const {name,description,price,discountPrice,stock,brand,gender,category,subCategory,variations , } = productUpdateDetail
        
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
            
            return updatepro

    } catch (error) {
        throw new Error(`Error in deleting product ${error.message}`);
        
    }
}



export { uploadProduct ,updateProductById }
