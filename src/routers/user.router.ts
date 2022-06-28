import { Router } from 'express';
import { User } from '../models/user.model.js';
import { UserController } from '../controllers/user.controller.js';

export const userController = new UserController(User);
export const userRouter = Router();

userRouter.get('/', userController.getAllController);
userRouter.get('/:id', userController.getController);
userRouter.post('/', userController.postController);
userRouter.post('/login', userController.loginController);
userRouter.patch('/:id', userController.patchController);
userRouter.delete('/:id', userController.deleteController);
