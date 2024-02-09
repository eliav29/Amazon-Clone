import express from 'express'
import { productData, getProductById, getProductByToken, getCategories, getProductsByQuery } from '../controllers/productController.js';
import expressAsyncHandler from 'express-async-handler';

const productRouter = express.Router();
productRouter.get('/', expressAsyncHandler(productData));
productRouter.get('/categories', expressAsyncHandler(getCategories));
productRouter.get('/search', expressAsyncHandler(getProductsByQuery));
productRouter.get('/token/:token', expressAsyncHandler(getProductByToken));
productRouter.get('/:id', expressAsyncHandler(getProductById));

export default productRouter;