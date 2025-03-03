import Product from "../models/productSchema.js";



const fetchAllProductsFromMongoDb = async (filter)=>{
    try {
        const {price,brand,gender} = filter
        const query = {}
        if(price) query.price = {$lt:price};
        if(brand) query.brand = brand;
        if(gender) query.gender = gender;

        const allProducts = await Product.find(query)
        const TotalProducts = await Product.countDocuments(query)
        
        return {allProducts,TotalProducts}

    } catch (error) {
        throw new Error("Error While Fetching All Products",error.message);
        
    }
}


const fetchCategoryListByGenderFromMongoDB = async (gender)=>{
    try {
        

        const filter = { gender: { $regex: `^${gender}$`, $options: "i" } };

        const CategoriesListByGender = await Product.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: "$category",
                    subCategories: { $addToSet: "$subCategory" }
                }
            },
            { $sort: { _id: 1 } },


        ]);

        return CategoriesListByGender

    } catch (error) {
        throw new Error("Error While Fetching Product By Gender",error.message);
    }
}

const fetchProductsByCategoryFromMongoDb = async (category,filter)=>{
    try {
        const {price,brand,gender} = filter
        
        const query = {}
        if (price) query.price = {$lte:Number(price)}
        if (gender) query.gender = { $regex: `^${gender}$`, $options: "i" };
        if (brand) query.brand = {$regex:brand,$options:"i"}
        
        
        const matchFilter = {subCategory:{ $regex: `^${category}$`, $options: "i" }}
        const categoryProducts = await Product.aggregate([
            {$match:{...matchFilter,...query}},
            
            {
                $group:{
                    _id:"$subCategory",
                    TotalProducts:{$sum:1},
                    Products: {$push:'$$ROOT'}
                }
            }
        ])

        return categoryProducts

    } catch (error) {
        throw new Error("Error in fetchProductsByCategoryFromMongoDb",error.message);
        
    }
}


const fetchProductsBySearchKeyFromMongoDb = async (searchKey)=>{
    try {
        
        const searchProducts = await Product.aggregate([
            {
                $search:{
                    index: "search",
                    text:{
                        query:searchKey,
                        path:["name","brand","gender","category","subCategory"]
                    },
                    
                }
            },
            
        ])

        return searchProducts

    } catch (error) {
        throw new Error("Error while handling search functionality",error.message);
        
    }
}


export {
    fetchCategoryListByGenderFromMongoDB ,
    fetchAllProductsFromMongoDb,
    fetchProductsByCategoryFromMongoDb,
    fetchProductsBySearchKeyFromMongoDb
}