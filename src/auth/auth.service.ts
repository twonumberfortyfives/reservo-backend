import { Injectable } from '@nestjs/common';
import { LoginUrlResponseDto } from './dto/login-url-response.dto';
import { AsyncLocalStorage } from 'async_hooks';
import { URLSearchParams } from 'url';
import { randomBytes } from 'crypto';
import { Request } from 'express';

@Injectable()
export class AuthService {
    private static readonly clientId = process.env.OAUTH_CLIENT_ID!;
    private static readonly backendUrl = process.env.BACKEND_URL!;
    private static readonly baseUrl = 'https://accounts.google.com/o/oauth2/auth';
    private static readonly scope = 'https://www.googleapis.com/auth/cloud-platform';

    constructor(
        private readonly als: AsyncLocalStorage<{oauth_state: string}>
    ) {}

    async getUrlParams(state: string): Promise<URLSearchParams> {
        return new URLSearchParams({
            client_id: AuthService.clientId,
            scope: AuthService.scope,
            redirect_uri: `${AuthService.backendUrl}/api/oauth/callback`,
            access_type: 'offline',
            response_type: 'code',
            state: state
        });
    }
     
    async generateLoginUrl(): Promise<LoginUrlResponseDto> {
        const state = randomBytes(24).toString('hex');
        const params = (await this.getUrlParams(state)).toString();
        this.als.enterWith({oauth_state: state});
        return {url: `${AuthService.baseUrl}?${params}`};
    }

    async handleCallback(res: Request) {
        return {message: 'ok'}
    }
}