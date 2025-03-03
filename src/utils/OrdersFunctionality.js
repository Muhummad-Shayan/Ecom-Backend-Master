import Order from "../models/orderSchema.js";




const createOrder = async (orderDetails) =>{
    try {
        
        const {user,items,totalAmount,paymentMethod,paymentStatus,paymentId,address,phoneNumber,orderNotes} = orderDetails

        const order = new Order({
            user,
            items,
            totalAmount,
            status : paymentMethod === "Card" ? "Processing" : "Pending",
            paymentMethod,
            paymentStatus,
            paymentId,
            address,
            phoneNumber,
            orderNotes
        })

        await order.save()

        return order
        

    } catch (error) {
        throw new Error("Error in creating order",error.message);
        
    }
}

const getOrdersById = async (id)=>{
    try {
        
        const orders = await Order.find({user:id}).sort({createdat:-1}).populate("items.product")

        return orders

    } catch (error) {
        throw new Error("Error in getOrdersById",error.message);
    }
}



export {
    createOrder,
    getOrdersById
}