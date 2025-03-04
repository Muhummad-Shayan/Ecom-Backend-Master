import Order from "../models/orderSchema.js";
import Product from "../models/productSchema.js";




const createOrder = async (orderDetails) =>{
    try {
        
        const {user,items,totalAmount,paymentMethod,paymentStatus,paymentId,address,phoneNumber,orderNotes} = orderDetails

        const order = new Order({
            user ,
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

        if(order.status === "Processing") {
            await Promise.all(order.items.map(async (items) => {

                const productId =  items.product.toString()
                await Product.findByIdAndUpdate(productId, { $inc: { stock: -items.quantity } });

            }))
            
        }

        await order.save()

        return order
        

    } catch (error) {
        throw new Error(`Error in creating order: ${error.message}`);

        
    }
}

const getOrdersById = async (id)=>{
    try {
        
        const orders = await Order.find({user:id}).sort({createdat:-1}).populate("items.product")

        return orders

    } catch (error) {
        throw new Error(`Error in getOrdersById: ${error.message}`);
        
    }
}

const updateOrderByID = async (id,updateDetails)=>{
    try {
        
        const updateOrder = await Order.findByIdAndUpdate(id,updateDetails)
        
        return updateOrder

    } catch (error) {
        throw new Error(`Error in updateOrderByID: ${error.message}`);
    }
}



export {
    createOrder,
    getOrdersById,
    updateOrderByID
}