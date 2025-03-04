import express  from 'express';
import { getAllOrders, getMyOrders, orderProduct, updateOrder } from '../controllers/OrderController.js';

import { verifyAdmin } from '../middleware/verifyAdmin.js';
import { verifyToken } from '../middleware/verifyToken.js';

const OrderRouter = express.Router();

OrderRouter.post('/create',verifyToken,orderProduct)

OrderRouter.get('/all',verifyToken,verifyAdmin,getAllOrders)

OrderRouter.get('/myorders',verifyToken,getMyOrders)

OrderRouter.put('/update/:id',verifyToken,verifyAdmin,updateOrder)



export default OrderRouter;