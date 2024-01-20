import express from 'express';
import {signup , signin} from '../controllers/userController.js';
import expressAsyncHandler from 'express-async-handler';

const userRouter = express.Router();
userRouter.post('/signin', expressAsyncHandler(signin));
userRouter.post('/signup', expressAsyncHandler(signup));

export default userRouter;