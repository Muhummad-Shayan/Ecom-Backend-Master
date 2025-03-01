import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js'
import { verifyAdmin } from '../middleware/verifyAdmin.js'
import { uploadMulter } from '../middleware/multer.js'
import { createProduct, deleteProduct, updateProduct } from '../controllers/productController.js'
import { getAllProducts, getProductsByCategory, getProductsCategoryListByGender, getSingleProduct } from '../controllers/readProductController.js'

const productRouter = express.Router()

productRouter.post('/upload-product',verifyToken,verifyAdmin,uploadMulter.fields([
    {name:'thumbnail',maxCount: 1},
    {name:'images',maxCount: 5}
]),createProduct)


productRouter.delete('/delete-product/:id',verifyToken,verifyAdmin,deleteProduct)

productRouter.put('/update-product/:id',verifyToken,verifyAdmin,updateProduct)

productRouter.get('/:productId',getSingleProduct)

productRouter.get('/category-list/:gender',getProductsCategoryListByGender)

productRouter.get('/category/:category',getProductsByCategory)

productRouter.get('',getAllProducts)


export {productRouter}