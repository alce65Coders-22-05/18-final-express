import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';
import { iTask } from '../models/task.model.js';
import { User } from '../models/user.model.js';
import { BasicController } from './basic.controller.js';

export class TaskController<T> extends BasicController<T> {
    constructor(public model: Model<T>) {
        super(model);
    }

    getAllController = async (req: Request, resp: Response) => {
        req;
        resp.setHeader('Content-type', 'application/json');
        resp.send(
            await this.model.find().populate('responsible', {
                tasks: 0,
            })
        );
    };

    postController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        try {
            // Crear nueva tarea (titulo, resposible (id))
            const newTask = await this.model.create(req.body);
            // Añadir tarea al array de tareas del usuario (responsible)
            const user = await User.findById(req.body.responsible);
            if (!user) {
                throw new Error('User not found');
            }
            user.tasks = [...(user.tasks as Array<iTask>), newTask.id];
            user.save();
            resp.setHeader('Content-type', 'application/json');
            resp.status(201);
            resp.send(JSON.stringify(newTask));
        } catch (error) {
            next(error);
        }
    };
}
