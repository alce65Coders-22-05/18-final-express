import request from 'supertest';
import { app } from '../app.js';
import { initDB } from '../db/init.db.js';

describe('Given...', () => {
    beforeEach(async () => {
        await initDB();
    });

    test('Test task get', async () => {
        const response = await request(app).get('/task/').expect(200);
        expect(response.statusCode).toBe(200);
    });
});

// request(app).get('/task/:id');

// request(app).post('/task/');

// request(app).patch('/task/:id');

// request(app).delete('/task/:id');
