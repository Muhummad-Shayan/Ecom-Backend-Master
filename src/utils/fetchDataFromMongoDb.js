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


const fetchCtegoryListByGenderFromMongoDB = async (gender)=>{
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




export {fetchCtegoryListByGenderFromMongoDB,fetchAllProductsFromMongoDb}