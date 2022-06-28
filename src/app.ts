import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
// import path from 'path'

// import homeRouter from './router/home.js';
import { taskRouter } from './routers/task.router.js';
import { userRouter } from './routers/user.router.js';
// import { notesRouter } from './router/notes.js';
// import { bookRouter } from './router/books.js';

export const app = express();

// Middlewares

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// app.use('/', homeRouter);
app.use('/task', taskRouter);
app.use('/tasks', taskRouter);
app.use('/user', userRouter);
app.use('/users', userRouter);
// app.use('/notes', notesRouter);

const errors: any = {
    ValidationError: 406, // Not Acceptable
    CastError: 422, // Unprocessable entity
    UserError: 404, // Not found
    UserAuthorizationError: 401, // Unauthorized
    TokenError: 401, // Unauthorized
};

app.use((error: Error, req: Request, resp: Response, next: NextFunction) => {
    req;
    next;
    console.log(error.message);

    let status = 500;
    if (error.name) status = errors[error.name];

    resp.status(status);
    const result = {
        status: status,
        type: error.name,
        error: error.message,
    };
    resp.send(JSON.stringify(result));
});
