import { NestMiddleware } from "@nestjs/common";
import { randomBytes } from "crypto";
import { Request, Response, NextFunction } from 'express';

export class CsrfMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        const csrfHeader = req.headers['x-csrf-token'];

        if (['POST', 'PATCH', 'PUT', 'DELETE'].includes(req.method)) {
            const csrfCookie = req.cookies['csrf-token'];
            if (!csrfCookie || csrfHeader !== csrfCookie) {
                return res.status(403).send({'error': 'request does not inclue csrf token'})
            }
        };

        if (!res.cookie['csrf-token']) {
            const token = randomBytes(24).toString('hex')
            res.cookie('csrf_token', token, {httpOnly: true})
        }

        next();
    }
}