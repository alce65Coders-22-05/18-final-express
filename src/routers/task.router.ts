import { Router } from 'express';
import { Task } from '../models/task.model.js';
import { TaskController } from '../controllers/task.controller.js';

export const taskController = new TaskController(Task);
export const taskRouter = Router();

taskRouter.get('/', taskController.getAllController);
taskRouter.get('/:id', taskController.getController);
taskRouter.post('/', taskController.postController);
// taskRouter.patch('/complete/:id', taskController.completeController);
taskRouter.patch('/:id', taskController.patchController);

taskRouter.delete('/:id', taskController.deleteController);
