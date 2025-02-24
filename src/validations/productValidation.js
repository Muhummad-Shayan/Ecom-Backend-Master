import Joi from "joi";

const productValidationSchema = Joi.object({
    name: Joi.string().trim().required().messages({
        "string.empty": "Product name is required",
    }),
    description: Joi.string().required().messages({
        "string.empty": "Product description is required",
    }),
    price: Joi.number().min(0).required().messages({
        "number.base": "Price must be a number",
        "number.min": "Price cannot be negative",
        "any.required": "Price is required",
    }),
    discountPrice: Joi.number().min(0).optional().messages({
        "number.base": "Discount price must be a number",
        "number.min": "Discount price cannot be negative",
    }),
    stock: Joi.number().min(0).required().messages({
        "number.base": "Stock must be a number",
        "number.min": "Stock cannot be negative",
        "any.required": "Stock is required",
    }),
    brand: Joi.string().trim().optional(),
    category: Joi.string().trim().required().messages({
        "string.empty": "Category is required",
    }),
    subCategory: Joi.string().trim().required().messages({
        "string.empty": "Subcategory is required",
    }),
    gender: Joi.string().valid("Men", "Women", "Kids", "Unisex").required().messages({
        "any.only": "Gender must be 'Men', 'Women', 'Kids', or 'Unisex'",
        "any.required": "Gender category is required",
    }),
    variations: Joi.array().items(
        Joi.object({
            color: Joi.string().trim().optional(),
            size: Joi.string().trim().optional(),
            stock: Joi.number().min(0).optional().messages({
                "number.min": "Stock cannot be negative",
            }),
        })
    ),
    thumbnail: Joi.string().optional(), // Cloudinary ke liye optional rakh raha hoon
    images: Joi.array().items(Joi.string()).optional(),
    ratings: Joi.number().min(0).max(5).default(0).messages({
        "number.min": "Ratings cannot be negative",
        "number.max": "Ratings cannot be more than 5",
    }),
    reviews: Joi.array().items(
        Joi.object({
            user: Joi.string().required(),
            rating: Joi.number().min(1).max(5).required().messages({
                "number.min": "Rating must be at least 1",
                "number.max": "Rating cannot exceed 5",
            }),
            comment: Joi.string().trim().optional(),
            createdAt: Joi.date().default(Date.now),
        })
    ),
    createdAt: Joi.date().default(Date.now),
});

export default productValidationSchema;
