import request from 'supertest';
import { server } from '../index.js';
import { app } from '../app.js';
import { initDB } from '../db/init.db.js';
import { mongooseConnect } from '../db/mongoose.js';
import * as aut from '../services/authorization';
import { iTask } from '../models/task.model.js';

describe('Given the routes of "/task" ', () => {
    // let connect: typeof import('mongoose');
    let data: { [key: string]: Array<any> };
    let token: string;
    beforeEach(async () => {
        data = await initDB();
        //  connect =
        await mongooseConnect();
        token = aut.createToken({
            id: data.users[0].id,
            name: data.users[0].name,
        });
    });

    afterEach(async () => {
        //connect.disconnect();
        server.close();
    });

    describe('When method GET is used', () => {
        test('If I am not logged, then status should be 401', async () => {
            const response = await request(app).get('/task/');
            //.expect(401);
            expect(response.statusCode).toBe(401);
        });

        test('If I am logged, then status should be 200', async () => {
            const response = await request(app)
                .get('/task/')
                .set('Authorization', 'Bearer ' + token);
            //.expect(200);
            expect(response.statusCode).toBe(200);
        });
    });

    describe('When method GET is used in "/:id" route', () => {
        test('If I am not logged, then status should be 401', async () => {
            const response = await request(app).get(
                `/task/${data.tasks[0].id}`
            );
            expect(response.statusCode).toBe(401);
        });
    });

    describe('POST', () => {
        test('If I am logged, then status should be 201', async () => {
            const newTask: iTask = {
                title: 'Tarea 3',
                responsible: data.users[0].id,
                isCompleted: false,
            };
            const response = await request(app)
                .post('/task/')
                .set('Authorization', 'Bearer ' + token)
                .send(newTask);
            //.expect(200);
            expect(response.statusCode).toBe(201);
        });
    });
});

// request(app).patch('/task/:id');

// request(app).delete('/task/:id');
