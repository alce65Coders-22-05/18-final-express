import request from 'supertest';
import { app } from '../app';

request(app).get('/task/');

request(app).get('/task/:id');

request(app).post('/task/');

request(app).patch('/task/:id');

request(app).delete('/task/:id');
