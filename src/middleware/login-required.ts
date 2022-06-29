import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { ExtRequest, iTokenPayload } from '../interfaces/token';
import * as aut from '../services/authorization.js';

export const loginRequired = (
    req: Request,
    resp: Response,
    next: NextFunction
) => {
    const authorization = req.get('authorization');
    let token;
    const tokenError = new Error('token missing or invalid');
    tokenError.name = 'TokenError';
    let decodedToken: string | JwtPayload;
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7);
        decodedToken = aut.verifyToken(token);
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
