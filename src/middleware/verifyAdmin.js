import { sendResponse } from "../helper/response.js";

export const verifyAdmin = (req,res,next)=>{
    try {
        
        if (!req.user || req.user.role !== 'admin') {
            
            return sendResponse(403, res, null, "Forbidden: Admin access required");
        }
        
        next()

    } catch (error) {
        console.error("Error in verifyAdmin:",error);
        return sendResponse(500,res,null,"Internal Server Error",error.message)
        
    }
}