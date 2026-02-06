import { Controller, Get, Post, Query, Res, Req } from "@nestjs/common";
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { IAccessTokenResponse, IOAuthLoginUrl } from "./auth.interfaces";


@Controller("oauth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get("login")
    async login(@Res() res: Response): Promise<Response<IOAuthLoginUrl>> {
        const result = await this.authService.generateLoginUrl();
        res.cookie('oauth_state', result.state, {httpOnly: true, maxAge: 5 * 60 * 1000});
        return res.json({ loginUrl: result.url });
    }
    
    @Post("logout")
    async logout(res: Request) {
        return
    }

    @Get("callback")
    async callback(
        @Req() req: Request, 
        @Res() res: Response, 
        @Query('code') code: string, 
        @Query('state') state: string
    ): Promise<Response<IAccessTokenResponse>> {
        if (!code || !state) {
            return res.status(400).json({ error: 'code or state does not persist in request params' });
        };

        if (state !== req.cookies?.oauth_state) {
            return res.status(403).json({ error: 'states are different' });
        };

        const tokens = await this.authService.fetchTokensWithAuthCode(code);
        res.clearCookie('oauth_state', {httpOnly: true});

        if (tokens.refresh_token) {
            res.cookie('refresh_token', tokens.refresh_token, {
                httpOnly: true,
                maxAge: tokens.refresh_token_expires_in
            })
        }

        return res.json({
            access_token: tokens.access_token,
            expires_in: tokens.expires_in,
            token_type: tokens.token_type,
        } as IAccessTokenResponse)
    }
}
