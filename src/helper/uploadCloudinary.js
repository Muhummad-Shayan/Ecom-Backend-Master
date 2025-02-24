import cloudinary from '../config/cloudinary.js'

const uploadToCloudinary = async (filePath)=>{
    try {

        const result = await cloudinary.uploader.upload(filePath,{
            folder: 'ecommerce',
            resource_type: 'auto'
        })
        return result.secure_url
        
    } catch (error) {
        console.error("Error in uploading to cloudinary",error);
        throw new Error("Failed to upload image");
        
    }
}

export default uploadToCloudinary
