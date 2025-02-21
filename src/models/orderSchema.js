import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId , ref:"User" , required: true},
    items:[
        {
            products:{type: mongoose.Schema.Types.ObjectId , ref: "Product", required: true},
            quantity: {type:Number,required: true}
        }
    ],
    totalAmount:{type:Number , required: true},
    status:{
        type:String,
        enum:["Pending","Processing","Shipped","Delivered","Cancelled"],
        default:"Pending"
    },
    paymentMethod: { type: String, enum: ["COD", "Card"], required: true },
    address: { type: String, required: true },


},{timestamps: true})

const Order = mongoose.model("Order", orderSchema)

export default Order