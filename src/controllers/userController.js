import { sendResponse } from "../helper/response.js";
import User from "../models/userSchema.js";
import { getUserProfileById, updateUserById } from "../utils/UserFunctionality.js";

const getUserProfile = async (req,res)=>{
    try {

        const userId = req.user.id 
        
        const userDetail = await getUserProfileById(userId)

        return sendResponse(200,res,userDetail,"User Profile Fetched Successfully")
        
    } catch (error) {
        console.error("error in fetching user",error);
        return sendResponse(500,res,null,"Internal Server Error",error.message)
        
    }
}

const updateUserProfile = async (req,res)=>{
    try {
        
        const userId = req.user.id

        const updatedUser = await updateUserById(userId,req.body)

        return sendResponse(201,res,updatedUser,"User Updated Successfully")

    } catch (error) {
        console.error("error while updating user",error);
        return sendResponse(500,res,null,"Internal Server Error",error.message)
        
    }
}

const getAllUsers = async (req,res)=>{
    try {
        
        const allUsers = await User.find({})
        const totalUsers = allUsers.length
        return sendResponse(200,res,{TotalUser: totalUsers, allUsers},"All Users Fetched Successfully")

    } catch (error) {
        console.error("error in fetching all users",error);
        return sendResponse(500,res,null,"Internal Server Error",error.message)
        
    }
}


export{
    getUserProfile,
    updateUserProfile,
    getAllUsers
}

