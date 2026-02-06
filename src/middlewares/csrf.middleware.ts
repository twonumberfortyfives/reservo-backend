import { NestMiddleware } from "@nestjs/common";
import { randomBytes } from "crypto";
import { Request, Response, NextFunction } from 'express';

export class CsrfMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        const csrfToken: undefined | string = req.cookies.csrf_token

        if (['POST', 'PATCH', 'PUT', 'DELETE'].includes(req.method) && !csrfToken) {
            return res.status(403).send({'error': 'request does not inclue csrf token'})
        } else {
            const token = randomBytes(24).toString('hex')
            res.cookie('csrf_token', token, {httpOnly: true})
        }

        next();
    }
}