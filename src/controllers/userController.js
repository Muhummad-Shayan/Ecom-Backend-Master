import { sendResponse } from "../helper/response.js";
import User from "../models/userSchema.js";

const getUserProfile = async (req,res)=>{
    try {

        const userId = req.user.id 
        const user = await User.findOne({_id:userId}).select('-password')

        if (!user) {
            console.error("User Not Found");
            return sendResponse(404,res,null,"User Not Found")
            
        }

        return sendResponse(200,res,user,"User Fetched Successfully")
        
    } catch (error) {
        console.error("error in fetching user",error);
        return sendResponse(500,res,null,"Internal Server Error",error.message)
        
    }
}

const updateUserProfile = async (req,res)=>{
    try {
        const {name, email, address, contact} = req.body;
        const userId = req.user.id

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
            $set:{
                ...(name && {name}),
                ...(email && {email}),
                ...(address && {address}),
                ...(contact && {contact}),}
            },
                { new: true} 
        ).select("-password") 
        
        if (!updatedUser) {
            return sendResponse(404, res, null, "User Not Found");
        }

        return sendResponse(200,res,updatedUser,"User Updated Successfully")

    } catch (error) {
        console.error("error while updating user",error);
        return sendResponse(500,res,null,"Internal Server Error",error.message)
        
    }
}


export{
    getUserProfile,
    updateUserProfile
}

