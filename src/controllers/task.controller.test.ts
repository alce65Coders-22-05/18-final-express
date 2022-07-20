import { NextFunction, Request, Response } from 'express';
import { iTask, Task } from '../models/task.model';
import { User } from '../models/user.model';
import { TaskController } from './task.controller';

jest.mock('../models/task.model');
jest.mock('../models/user.model');

describe('Given a instantiated controller BasicController with model Task injected', () => {
    let controller: TaskController<iTask>;
    let req: Partial<Request>;
    let resp: Partial<Response>;
    let next: NextFunction;
    beforeEach(() => {
        req = {
            params: { id: '1' },
            body: {},
        };
        resp = {
            setHeader: jest.fn(),
            status: jest.fn(),
            send: jest.fn(),
        };
        next = jest.fn();

        controller = new TaskController(Task) as any;
    });
    describe('When method getAllController is called', () => {
        test('Then resp.send should be called', async () => {
            Task.find = jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValue([{ task: 'test' }]),
            });
            await controller.getAllController(req as Request, resp as Response);
            expect(Task.find).toHaveBeenCalled();
            expect(resp.send).toHaveBeenCalledWith([{ task: 'test' }]);
        });
    });

    describe('When method getController is called', () => {
        test('And response is ok, then resp.send should be called with data', async () => {
            const result = { test: 'test' };
            Task.findById = jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValue(result),
            });
            await controller.getController(
                req as Request,
                resp as Response,
                next
            );
            expect(resp.send).toHaveBeenCalledWith(JSON.stringify(result));
        });
        test('And response is not ok, then resp.send should be called without data', async () => {
            const result = null;

            Task.findById = jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValue(result),
            });
            await controller.getController(
                req as Request,
                resp as Response,
                next
            );
            expect(resp.send).toHaveBeenCalledWith(JSON.stringify({}));
            expect(resp.status).toHaveBeenCalledWith(404);
        });
    });

    describe('When method postController is called', () => {
        test('Then resp.send should be called with data', async () => {
            const result = { test: 'test' };
            req.body.responsible = 'Pepe';
            User.findById = jest.fn().mockResolvedValue({
                tasks: [],
                save: jest.fn(),
            });
            Task.create = jest.fn().mockResolvedValue(result);
            await controller.postController(
                req as Request,
                resp as Response,
                next
            );
            expect(resp.send).toHaveBeenCalledWith(JSON.stringify(result));
        });
    });

    describe('When method patchController is called', () => {
        test('Then resp.send should be called with data', async () => {
            const result = { test: 'test' };
            Task.findByIdAndUpdate = jest.fn().mockResolvedValue(result);
            await controller.patchController(req as Request, resp as Response);
            expect(resp.send).toHaveBeenCalledWith(JSON.stringify(result));
        });
    });

    describe('When method deleteController is called', () => {
        test('Then res.status should be called with status', async () => {
            const result = { status: 202 };
            Task.findByIdAndDelete = jest.fn().mockResolvedValue(result);
            await controller.deleteController(req as Request, resp as Response);
            expect(resp.status).toHaveBeenCalledWith(202);
        });
    });
});
