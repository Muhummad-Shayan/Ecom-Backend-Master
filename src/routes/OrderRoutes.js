import express  from 'express';
import { orderProduct } from '../controllers/OrderController.js';

const OrderRouter = express.Router();

OrderRouter.post('/create',orderProduct)

