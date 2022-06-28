import { Router } from 'express';
import { Task } from '../models/task.model.js';
import { TaskController } from '../controllers/task.controller.js';
import { loginRequired } from '../middleware/login-required.js';
import { userRequired } from '../middleware/user-required.js';

export const taskController = new TaskController(Task);
export const taskRouter = Router();

taskRouter.get('/', loginRequired, taskController.getAllController);
taskRouter.get('/:id', loginRequired, taskController.getController);
taskRouter.post('/', loginRequired, taskController.postController);
// taskRouter.patch('/complete/:id', taskController.completeController);
taskRouter.patch(
    '/:id',
    loginRequired,
    userRequired,
    taskController.patchController
);

taskRouter.delete(
    '/:id',
    loginRequired,
    userRequired,
    taskController.deleteController
);
