import request from 'supertest';
import { app } from '../app.js';
import { initDB } from '../db/init.db.js';
import { mongooseConnect } from '../db/mongoose.js';

describe('Given the routes of "/task" ', () => {
    let connect: typeof import('mongoose');
    beforeEach(async () => {
        connect = await mongooseConnect();
        await initDB();
    });

    afterEach(async () => {
        connect.disconnect();
    });

    describe('When method GET is used', () => {
        test('If I am not logged, then status should be 401', async () => {
            const response = await request(app).get('/task/');
            //.expect(200);
            expect(response.statusCode).toBe(401);
        });
    });
});

// request(app).get('/task/:id');

// request(app).post('/task/');

// request(app).patch('/task/:id');

// request(app).delete('/task/:id');
