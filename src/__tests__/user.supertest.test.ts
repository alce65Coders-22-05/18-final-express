import request from 'supertest';
import { app } from '../app';

describe('first', () => {
    request(app).get('/user/');
    request(app).get('/user/:id');
    request(app).post('/user/');
    request(app).post('/user/login');
    request(app).patch('/user/:id');
    request(app).delete('/user/:id');
    test.todo('ToDo');
});
