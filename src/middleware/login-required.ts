import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ExtRequest, iTokenPayload } from '../interfaces/token';
dotenv.config();

export const loginRequired = (
    req: Request,
    resp: Response,
    next: NextFunction
) => {
    const authorization = req.get('authorization');
    let token;
    const tokenError = new Error('token missing or invalid');
    tokenError.name = 'TokenError';
    let decodedToken;
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7);
        decodedToken = jwt.verify(token, process.env.SECRET as string);
        if (typeof decodedToken === 'string') {
            next(tokenError);
        } else {
            (req as ExtRequest).tokenPayload = decodedToken as iTokenPayload;
            next();
        }
    } else {
        next(tokenError);
    }
};
