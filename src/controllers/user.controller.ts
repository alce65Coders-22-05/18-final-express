import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { BasicController } from './basic.controller.js';

export class UserController<T> extends BasicController<T> {
    constructor(public model: Model<T>) {
        super(model);
    }

    getAllController = async (req: Request, resp: Response) => {
        req;
        resp.setHeader('Content-type', 'application/json');
        resp.send(
            await this.model.find().populate('tasks', {
                responsible: 0,
            })
        );
    };
}
