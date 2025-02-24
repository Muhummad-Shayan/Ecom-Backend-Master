import { sendResponse } from "../helper/response.js";

const createProduct = async (req,res)=>{
    try {
        console.log('shayan');
        


    } catch (error) {
        console.error("Error in creating products",error);
        sendResponse(500,res,null,"Internal Server Error",error.message)
        
    }
}


export {
    createProduct
}