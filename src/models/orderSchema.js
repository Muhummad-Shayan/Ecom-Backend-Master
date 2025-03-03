import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true }
        }
    ],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Pending"
    },
    paymentMethod: { type: String, enum: ["COD", "Card"], required: true },
    paymentStatus: { 
        type: String, 
        enum: ["Pending", "Paid", "Failed"], 
        default: "Pending" 
    },
    paymentId: { type: String, default: null }, // Required only for Card payments
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    orderNotes: { type: String }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;
