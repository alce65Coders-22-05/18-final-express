import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
// import path from 'path'

// import homeRouter from './router/home.js';
import { taskRouter } from './routers/task.router.js';
import { userRouter } from './routers/user.router.js';
import { errorControl } from './middleware/error-control.js';
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

app.use(errorControl);
