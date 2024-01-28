import express from 'express'
import { productData, getProductById, getProductByToken } from '../controllers/productController.js';
import expressAsyncHandler from 'express-async-handler';

const productRouter = express.Router();
productRouter.get('/', expressAsyncHandler(productData));
productRouter.get('/:id', expressAsyncHandler(getProductById));
productRouter.get('/token/:token', expressAsyncHandler(getProductByToken));

export default productRouter;