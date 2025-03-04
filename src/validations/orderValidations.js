import Joi from "joi";
import mongoose from "mongoose";

const orderValidationSchema = Joi.object({
    user: Joi.string().custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.error("any.invalid");
        }
        return value;
    }).required(),
    items: Joi.array().items(
        Joi.object({
            product: Joi.string().custom((value, helpers) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    return helpers.error("any.invalid");
                }
                return value;
            }).required(),
            quantity: Joi.number().integer().min(1).required(),
        })
    ).min(1).required(),
    totalAmount: Joi.number().min(0).required(),
    // status: Joi.string().valid("Pending", "Processing", "Shipped", "Delivered", "Cancelled"),
    paymentMethod: Joi.string().valid("COD", "Card").required(),
    paymentStatus: Joi.string().valid("Pending", "Paid", "Failed").default("Pending"),
    paymentId: Joi.alternatives().conditional("paymentMethod", {
        is: "Card",
        then: Joi.string().required(),  // Required for Card payments
        otherwise: Joi.string().allow(null).optional()  // Optional for COD
    }),
    address: Joi.string().min(5).required(),
    phoneNumber: Joi.string().pattern(/^\d{10,15}$/).required(),
    orderNotes: Joi.string().allow("").optional(),
});

const adminUpdateOrderSchema = Joi.object({
    status: Joi.string().valid("Pending", "Processing", "Shipped", "Delivered", "Cancelled").required(),
    paymentStatus: Joi.string().valid("Pending", "Paid", "Failed").optional(),
    deliveryDate: Joi.date().optional(),
}).min(1); 



export  {orderValidationSchema, adminUpdateOrderSchema};

