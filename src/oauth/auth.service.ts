import { Injectable } from '@nestjs/common';
import { URLSearchParams } from 'url';
import { randomBytes } from 'crypto';
import { Logger } from '@nestjs/common';
import { IOAuthTokens } from './auth.interfaces';


@Injectable()
export class AuthService {
    private static readonly clientId = process.env.OAUTH_CLIENT_ID!;
    private static readonly clientSecret = process.env.OAUTH_CLIENT_SECRET!;
    private static readonly backendUrl = process.env.BACKEND_URL!;

    private readonly redirectUrl = `${AuthService.backendUrl}/api/oauth/callback`;
    private readonly tokenUrl = 'https://oauth2.googleapis.com/token';
    private readonly baseUrl = 'https://accounts.google.com/o/oauth2/auth';
    private readonly scope = 'https://www.googleapis.com/auth/cloud-platform';

    constructor() {}

    async getLoginParams(state: string): Promise<URLSearchParams> {
        return new URLSearchParams({
            client_id: AuthService.clientId,
            scope: this.scope,
            redirect_uri: this.redirectUrl,
            access_type: 'offline',
            response_type: 'code',
            state: state
        });
    }

    async getCallbackParams(code: string): Promise<URLSearchParams> {
        return new URLSearchParams({
            code,
            client_id: AuthService.clientId,
            client_secret: AuthService.clientSecret,
            redirect_uri: this.redirectUrl,
            grant_type: 'authorization_code'
        });
    }
     
    async generateLoginUrl(): Promise<{ url: string; state: string }> {
        const state = randomBytes(24).toString('hex');
        const params = (await this.getLoginParams(state)).toString();
        return {url: `${this.baseUrl}?${params}`, state: state};
    }

    async fetchTokensWithAuthCode(code: string): Promise<IOAuthTokens> {    
        const res = await fetch(this.tokenUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: await this.getCallbackParams(code)
        });
        return await res.json() as IOAuthTokens;
    }
}