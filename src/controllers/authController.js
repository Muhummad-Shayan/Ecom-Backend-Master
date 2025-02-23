
import { sendResponse } from "../helper/response.js";
import User from "../models/userSchema.js";
import bcrypt from 'bcrypt'
import config from "../config/envconfig.js";
import { loginSchema, signupSchema } from "../validations/authValidation.js";
import { generateToken } from "../helper/jwtHelpers.js";

const signup = async (req,res) =>{
    try {
        const {name,email,password} = req.body
        const {error} = signupSchema.validate(req.body)
        
        if (error) {
            sendResponse(400,res,null,error.details[0].message)
            return
        }

        const user = await User.findOne({email})
        if (user) {
            
            return sendResponse(400,res,null,"User already exist, try another email")
            
        }
        
        
        const hashPassword = await bcrypt.hash(password , 10)


        const newUser = new User({
            name:name,
            email : email,
            password : hashPassword,
            contact: "",
            address:""

        })
        
        await newUser.save()

        
        newUser.password = undefined

        sendResponse(201,res,newUser,"User Signup Successfully")
        console.info("user",newUser);
        
        return 
        
    } catch (error) {
        
        console.error("error during register user",error);
        sendResponse(500,res,null,"Internal Server Error",error.message)
        return
        
    }

}


const login = async (req,res)=>{
    try {
        
        const {email,password} = req.body
        
        const {error} = loginSchema.validate(req.body)
        if (error) {
            sendResponse(400,res,null,error.details[0].message)
            return
        }
        
        const user = await User.findOne({email})
        
        if (!user) {
            return sendResponse(400,res,null,"user is not exist")
            
        }

        if (!config.AUTH_SECRET) {
            return sendResponse(500,res,null,"Internal Server Error","JWT Token Not Found")
        }
        
        const isMatch = await bcrypt.compare(password,user.password)

        if (!isMatch) {
            return sendResponse(400,res,null,"password is incorrect")
            
        }
    
        const token = generateToken(user._id,user.email,user.role)

        user.password = undefined
        
        
        console.info("user logged in successfully",user.email);
        return sendResponse(200,res,{user,token:token},"user login successfully")

        

        
    } catch (error) {
        console.error("error during login",error);
        return sendResponse(500,res,null,"Internal Server Error",error.message)
        
    }
}



export{
    signup,
    login
}
