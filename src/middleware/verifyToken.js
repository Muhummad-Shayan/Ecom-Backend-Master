import config from "../config/envconfig.js"
import { sendResponse } from "../helper/response.js"
import jwt from 'jsonwebtoken'
export const verifyToken = (req,res,next)=>{
    try {

        const bearerToken = req?.headers?.authorization 
        if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
            return sendResponse(401,res,null,"Token not starts with Bearer ","Or invalid Format")
        }
        
        const token = bearerToken.split(" ")[1]
        
        jwt.verify(token,config.AUTH_SECRET,(err,decoded)=>{
            if (err) {
                console.error("Error in verification of JWT",err);
                return sendResponse(403, res, null, "Invalid or Expired Token", err.message);
                
            }
            req.user  = decoded
            next()
        })

        
    } catch (error) {
        console.error("Invalid or Expire Token",error)
        return sendResponse(403,res,null,"Invalid or Expire Token",error.message)
    }
}


