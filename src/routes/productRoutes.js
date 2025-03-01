import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js'
import { verifyAdmin } from '../middleware/verifyAdmin.js'
import { uploadMulter } from '../middleware/multer.js'
import { createProduct, deleteProduct, updateProduct } from '../controllers/productController.js'
import { getAllProducts, getProductsByCategory, getProductsCategoryListByGender, getSingleProduct, handleSearchProducts } from '../controllers/readProductController.js'

const productRouter = express.Router()

productRouter.post('/upload', verifyToken, verifyAdmin, uploadMulter.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 5 }
]), createProduct);

productRouter.delete('/remove/:id', verifyToken, verifyAdmin, deleteProduct);

productRouter.put('/update/:id', verifyToken, verifyAdmin, updateProduct);

productRouter.get('/details/:productId', getSingleProduct);

productRouter.get('/categories/:gender', getProductsCategoryListByGender);

productRouter.get('/search', handleSearchProducts);

productRouter.get('/category/:category', getProductsByCategory);

productRouter.get('/all', getAllProducts);



export {productRouter}