import { Router } from 'express';
import { Task } from '../models/task.model.js';
import { BasicController } from '../controllers/basic.controller.js';
import { iAppModel } from '../models/app.model.js';
import mongoose from 'mongoose';

export const taskController = new BasicController(
    Task as unknown as iAppModel<mongoose.Schema>
);
export const taskRouter = Router();

taskRouter.get('/', taskController.getAllController);
taskRouter.get('/:id', taskController.getController);
taskRouter.post('/', taskController.postController);
taskRouter.patch('/:id', taskController.patchController);
taskRouter.delete('/:id', taskController.deleteController);
