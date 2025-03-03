



const createOrder = async (orderDetails) =>{
    try {
        
        console.log("Order Details",orderDetails);
        

    } catch (error) {
        throw new Error("Error in creating order",error.message);
        
    }
}


export {
    createOrder
}