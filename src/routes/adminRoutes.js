import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js'
import { verifyAdmin } from '../middleware/verifyAdmin.js'
import { uploadMulter } from '../middleware/multer.js'
import { createProduct, deleteProduct, updateProduct } from '../controllers/adminController.js'

const adminRouter = express.Router()

adminRouter.post('/upload-product',verifyToken,verifyAdmin,uploadMulter.fields([
    {name:'thumbnail',maxCount: 1},
    {name:'images',maxCount: 5}
]),createProduct)

adminRouter.delete('/delete-product/:id',verifyToken,verifyAdmin,deleteProduct)

adminRouter.put('/update-product/:id',verifyToken,verifyAdmin,updateProduct)


export {adminRouter}