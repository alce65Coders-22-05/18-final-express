import { Router } from 'express';
import { User } from '../models/user.model.js';
import { UserController } from '../controllers/user.controller.js';
import { loginRequired } from '../middleware/login-required.js';

export const userController = new UserController(User);
export const userRouter = Router();

userRouter.get('/', userController.getAllController);
userRouter.get('/:id', userController.getController);
userRouter.post('/', userController.postController); // regitro
userRouter.post('/login', userController.loginController);
userRouter.patch('/:id', loginRequired, userController.patchController);
userRouter.delete('/:id', loginRequired, userController.deleteController);
