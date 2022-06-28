import { NextFunction, Request, Response } from 'express';
import { ExtRequest } from '../interfaces/token';

import { Task } from '../models/task.model.js';

export const userRequired = async (
    req: Request,
    resp: Response,
    next: NextFunction
) => {
    // el usuario tiene acceso al recurso (e.g. Tarea)

    const userID = (req as unknown as ExtRequest).tokenPayload.id;
    const findTask = await Task.findById(req.params.id);
    if (findTask?.responsible === userID) {
        next();
    } else {
        const error = new Error();
        error.name = 'UserAuthorizationError';
        next(error);
    }
};
