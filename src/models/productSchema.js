import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    stock: { type: Number, required: true },
    brand: { type: String },
    category: { type: String, required: true },  // Main category
    subCategory: { type: String, required: true },  // First subcategory
    variations: [
      {
        color: String,
        size: String,  // Example: M, L, XL for clothes
        stock: Number
      }
    ],
    thumbnail: { type: String, required: true },
    images: [{ type: String, required: true }],
    ratings: { type: Number, default: 0 },
    reviews: [
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          rating: { type: Number, required: true },
          comment: { type: String },
          createdAt: { type: Date, default: Date.now }
        }
      ],
    createdAt: { type: Date, default: Date.now },
  });

const Product = mongoose.model("Product", productSchema)

export default Product

